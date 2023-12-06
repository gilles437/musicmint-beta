import React, { useState, CSSProperties, useEffect } from 'react';
import { toast } from 'react-toastify';
import CircleLoader from 'react-spinners/ClipLoader';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AlbumMetadata } from '@/lib/redux';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { useAlbumContract } from '@/hooks/useAlbumContract';
import CreateSongForm, { CreateSongInput } from '@/components/AlbumSong/SongForm';

import CreateAlbumForm, { CreateAlbumInput } from './AlbumForm';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const toastFunction = (string: any) => {
  toast.info(string, { position: toast.POSITION.TOP_RIGHT });
};

const CreateAlbum = () => {
  const { query } = useRouter();

  const [currentAlbumId, setCurrentAlbumId] = useState<string>('');
  const [showSongs, setShowSongs] = useState(false);
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const [contractAddress, setContractAddress] = useState('');
  const { createAlbum } = useAlbumContract(contractAddress);

  useEffect(() => {
    if (query?.contract) {
      setContractAddress(query?.contract as string);
    }
  }, [query?.contract]);

  const handleCreateAlbum = async (input: CreateAlbumInput) => {
    console.log('handleCreateAlbum', input);
    try {
      setIsLoading(true);

      const imageCid = await uploadFile(input.image!);
      if (!imageCid) {
        console.error('error when uploading image nft');
        return false;
      }
      setSelectedImageFileCid(imageCid);

      const metadata: AlbumMetadata = {
        name: input.image ? input.image.name.toString() : '',
        title: input.title,
        description: input.description,
        price: input.price,
        image: createIpfsUrl(imageCid),
      };
      const metadataId = await uploadMetadata(metadata);
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
          setCurrentAlbumId(albumId);
          toastFunction(`New Album TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toastFunction(`New Album Metadata saved on ${metaUrl}`);
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
    return true;
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

        <CreateAlbumForm onSubmit={handleCreateAlbum} />

        {!!showSongs && <CreateSongForm onSubmit={handleCreateSong} />}
      </div>
    </section>
  );
};

export default CreateAlbum;