import React from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { Album, AlbumMetadata, fetchAlbumByIdAsync, useDispatch } from '@/lib/redux';
import { useSetTokenUri } from '@/hooks/contract/useSetTokenUri';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import EditAlbumForm, { CreateAlbumInput } from './AlbumForm';

type Props = {
  album: Album;
};

const EditAlbum = ({ album }: Props) => {
  const dispatch: any = useDispatch();
  const router = useRouter();
  const setTokenUri = useSetTokenUri(album?.contract);
  const metadata = useAlbumMetadata(album);

  const onAlbumUpdated = async (albumId: number) => {
    console.log('onAlbumUpdated', albumId);
    dispatch(fetchAlbumByIdAsync({ contract: album.contract, albumId }));

    const timerId = setTimeout(() => {
      router.push(`/album/owned`);
    }, 2000);
    return () => clearTimeout(timerId);
  };

  const handleUpdateAlbum = async (input: CreateAlbumInput) => {
    console.log('handleUpdateAlbum', input);
    try {
      let imageCid = null;
      if (input.file && input.file instanceof File) {
        imageCid = await uploadFile(input.file);
        if (!imageCid) {
          console.error('error when uploading image nft');
          return false;
        }
      }
      console.log('imageCid', imageCid);

      const meta: AlbumMetadata = {
        name: input.file?.name?.toString() || metadata?.name,
        title: input.title,
        description: input.description,
        price: input.price,
        image: imageCid ? createIpfsUrl(imageCid) : metadata?.image || '',
      };
      const metadataId = await uploadMetadata(meta);
      if (!metadataId) {
        console.error('error when uploading metadata');
        return false;
      }

      const metaUrl = createIpfsUrl(metadataId);
      toast.info(`Album Metadata saved on ${metaUrl}`);

      const albumId = await setTokenUri(album.albumid, metaUrl);
      console.log('success', albumId);

      if (albumId !== null && albumId !== undefined && albumId >= 0) {
        onAlbumUpdated(albumId);
        toast.info(`New Album TokenId is: ${Number(albumId)}`);
        return true;
      }
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    }

    toast.error(`Something wrong to update album`);
    return false;
  };

  return <EditAlbumForm album={album} onSubmit={handleUpdateAlbum} />;
};

export default EditAlbum;
