import React, { useCallback } from 'react';

import { Album } from '@/lib/redux';
import { useAlbum } from '@/hooks/useAlbum';
import EditAlbumForm, { CreateAlbumInput } from './AlbumForm';

type Props = {
  album: Album;
};

const EditAlbum = ({ album }: Props) => {
  const { createAlbum } = useAlbum(album?.contract);

  const handleUpdateAlbum = useCallback(
    async (input: CreateAlbumInput) => {
      console.log('handleUpdateAlbum', input);
      /*try {
      let imageCid = null;
      if (input.image) {
        imageCid = await uploadFile(input.image);
        if (!imageCid) {
          console.error('error when uploading image nft');
          return false;
        }
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
          toast.info(`New Album TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toast.info(`Album Metadata saved on ${metaUrl}`);
        return true;
      } else {
        toast.error(`Something wrong to create Album`);
      }
    } catch (error) {
      console.log(error);
    }*/
      return false;
    },
    [
      /*createAlbum*/
    ]
  );

  return <EditAlbumForm album={album} onSubmit={handleUpdateAlbum} />;
};

export default EditAlbum;
