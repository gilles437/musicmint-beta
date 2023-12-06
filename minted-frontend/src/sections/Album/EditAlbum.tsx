import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Link from 'next/link';

import { Album, AlbumMetadata } from '@/lib/redux';
import Loader from '@/components/Loader';
import { useAlbum } from '@/hooks/useAlbum';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import EditAlbumForm, { CreateAlbumInput } from './AlbumForm';

type Props = {
  album: Album;
}

const EditAlbum = ({ album }: Props) => {
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const albumMetadata = useAlbumMetadata(album);
  const { createAlbum } = useAlbum(album?.contract);

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
        (albumId: number) => {
          setIsLoading(false);
          toast.info(`New Album TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toast.info(`Album Metadata saved on ${metaUrl}`);
        return true;
      } else {
        setIsLoading(false);
        toast.error(`Something wrong to create Album`);
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
    <EditAlbumForm
      album={album}
      metadata={albumMetadata}
      onSubmit={handleUpdateAlbum}
    />
  );
};

export default EditAlbum;
