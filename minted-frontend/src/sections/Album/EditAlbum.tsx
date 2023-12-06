import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AlbumMetadata } from '@/lib/redux';
import Loader from '@/components/Loader';
import { useAlbumContract } from '@/hooks/useAlbumContract';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { useFindAlbumById } from '@/hooks/useFindAlbumById';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';

import EditAlbumForm, { CreateAlbumInput } from './AlbumForm';

const toastFunction = (string: any) => {
  toast.info(string, { position: toast.POSITION.TOP_RIGHT });
};

const EditAlbum = () => {
  const { query } = useRouter();

  const [albumId, setAlbumId] = useState<string>('');
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const album = useFindAlbumById(albumId);
  const albumMetadata = useAlbumMetadata(album);
  const { createAlbum } = useAlbumContract(album?.contract);

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

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="mb-3">
          <Link
            href="/album/owned"
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
      </div>
    </section>
  );
};

export default EditAlbum;
