import React, { useState, CSSProperties, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import CircleLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';

import {
  AlbumMetadata,
  SongMetadata,
  selectAlbums,
  useSelector,
} from '@/lib/redux';
import { useAlbumContract } from '@/hooks/useAlbumContract';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { useSelectAlbum } from '@/hooks/useSelectAlbum';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';

import EditAlbumForm, { CreateAlbumInput } from '../form/Album';
import EditSongForm, { CreateSongInput } from '../form/Song';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const toastFunction = (string: any) => {
  toast.info(string, { position: toast.POSITION.TOP_RIGHT });
};

const EditAlbum = () => {
  const { query } = useRouter();
  const albumList = useSelector(selectAlbums);

  const [albumId, setAlbumId] = useState<string>('');
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const album = useSelectAlbum(albumId);
  const albumMetadata = useAlbumMetadata(album);
  const { createAlbum, createSong } = useAlbumContract(album?.contract);

  useEffect(() => {
    if (query?.id) {
      setAlbumId(query?.id as string);
    }
  }, [query?.id]);

  const handleUpdateAlbum = async (input: CreateAlbumInput) => {
    console.log('handleUpdateAlbum', input);
    try {
      setIsLoading(true);

      let imageCid = null;
      if (input.image) {
        imageCid = await uploadFile(input.image);
        if (!imageCid) {
          console.error('error when uploading image nft');
          return false;
        }
        setSelectedImageFileCid(imageCid);
      }

      const imageUrl = albumMetadata?.image || '';
      const meta: AlbumMetadata = {
        name: input.image ? input.image.name.toString() : '',
        title: input.title,
        description: input.description,
        price: input.price,
        image: imageCid ? createIpfsUrl(imageCid) : imageUrl,
      };
      const metadataId = await uploadMetadata(meta);
      if (!metadataId) {
        console.error('error when uploading metadata');
        return false;
      }

      const metaUrl = createIpfsUrl(metadataId);
      const success = await createAlbum(
        Number(input.maxSupply),
        Number(input.price),
        metaUrl,
        (albumId: string) => {
          setIsLoading(false);
          setAlbumId(albumId);
          toastFunction(`New Album TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toastFunction(`Album Metadata saved on ${metaUrl}`);
        return true;
      } else {
        setIsLoading(false);
        toastFunction(`Something wrong to create Album`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  const handleCreateSong = async (input: CreateSongInput) => {
    console.log('handleCreateSong', input);
    if (!album) {
      console.error('Invalid album');
      return false;
    }

    try {
      setIsLoading(true);

      const imageId = await uploadFile(input.image);
      console.log('imageId', imageId)
      if (!imageId) {
        console.error('error when uploading image nft');
        return false;
      }

      const soundId = await uploadFile(input.sound);
      console.log('soundId', soundId)
      if (!soundId) {
        console.error('error when uploading sound nft');
        return false;
      }

      const meta: SongMetadata = {
        title: input.title,
        price: input.price,
        image: createIpfsUrl(imageId),
        sound: createIpfsUrl(soundId),
      };
      console.log('meta', meta)
      const metadataId = await uploadMetadata(meta);
      console.log('metadataId', metadataId)
      if (!metadataId) {
        console.error('error when uploading metadata');
        return false;
      }

      const metaUrl = createIpfsUrl(metadataId);
      console.log('metaUrl', metaUrl)
      const success = await createSong(
        album.albumid,
        Number(input.maxSupply),
        Number(input.price),
        metaUrl,
        (albumId: string) => {
          setIsLoading(false);
          toastFunction(`New Song TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toastFunction(
          `Song Metadata saved on ${metaUrl}`
        );
        return true;
      } else {
        setIsLoading(false);
        toastFunction(`Something wrong to create song`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  if (isLoading) {
    return (
      <CircleLoader
        color="#36d7b7"
        loading={isLoading}
        size={350}
        cssOverride={override}
      />
    );
  }

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="mb-3">
          <Link
            href="/album"
            className="d-flex"
            style={{ justifyContent: 'flex-end' }}
          >
            <h4>Back to My Album</h4>
          </Link>
        </div>

        <EditAlbumForm
          album={album}
          metadata={albumMetadata}
          onSubmit={handleUpdateAlbum}
        />

        <EditSongForm onSubmit={handleCreateSong} />
      </div>
    </section>
  );
};

export default EditAlbum;
