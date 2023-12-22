import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Album, SongMetadata, fetchSongByIdAsync, useDispatch } from '@/lib/redux';
import CreateSongForm, { CreateSongInput } from '@/components/AlbumSong/SongForm';
import { useCreateSong } from '@/hooks/contract/useCreateSong';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { createIpfsUrl } from '@/utils/ipfs';

type Props = {
  album: Album;
};

const CreateSong = ({ album }: Props) => {
  const dispatch = useDispatch();
  const createSong = useCreateSong();

  const onSongCreated = useCallback(
    (songId: number) => {
      console.log('onSongCreated', songId);
      dispatch(
        fetchSongByIdAsync({
          contract: album.contract,
          albumId: album.albumid,
          songId,
        })
      );
    },
    [dispatch, album]
  );

  const handleCreateSong = useCallback(
    async (input: CreateSongInput) => {
      console.log('handleCreateSong', input);
      if (!album) {
        console.error('Invalid album');
        return false;
      }

      try {
        const imageId = await uploadFile(input.image);
        console.log('imageId', imageId);
        if (!imageId) {
          console.error('error when uploading image nft');
          return false;
        }

        const soundId = await uploadFile(input.sound);
        console.log('soundId', soundId);
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
        console.log('meta', meta);
        const metadataId = await uploadMetadata(meta);
        console.log('metadataId', metadataId);
        if (!metadataId) {
          console.error('error when uploading metadata');
          return false;
        }

        const metaUrl = createIpfsUrl(metadataId);
        toast.info(`Song Metadata saved on ${metaUrl}`);

        const songId = await createSong(
          album.contract,
          album.albumid,
          Number(input.maxSupply),
          Number(input.price),
          metaUrl
        );
        console.log('songId', songId);

        if (songId && songId > 0) {
          onSongCreated(songId);
          toast.info(`New Song TokenId is: ${Number(songId)}`);
          return true;
        }
      } catch (err: any) {
        console.error(err);
        if (err && err.message === 'Cancelled') {
          toast.error(`Transaction cancelled`);
          return false;
        }
      }

      toast.error(`Something wrong to create song`);
      return false;
    },
    [album, createSong, onSongCreated]
  );

  return <CreateSongForm onSubmit={handleCreateSong} />;
};

export default CreateSong;
