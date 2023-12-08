import React, { useCallback } from 'react';
import { toast } from 'react-toastify';

import { Album, SongMetadata, fetchSongByIdAsync, useDispatch } from '@/lib/redux';
import CreateSongForm, { CreateSongInput } from '@/components/AlbumSong/SongForm';
import { useAlbumSong } from '@/hooks/useAlbumSong';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { createIpfsUrl } from '@/utils/ipfs';

type Props = {
  album: Album;
};

const CreateSong = ({ album }: Props) => {
  const dispatch = useDispatch();
  const { createSong } = useAlbumSong(album?.contract);

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
    [album]
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
        console.log('metaUrl', metaUrl);
        const success = await createSong(
          album.albumid,
          Number(input.maxSupply),
          Number(input.price),
          metaUrl,
          (songId: number) => {
            onSongCreated(songId);
            toast.info(`New Song TokenId is: ${Number(songId)}`);
          }
        );
        console.log('success', success);

        if (success) {
          toast.info(`Song Metadata saved on ${metaUrl}`);
          return true;
        } else {
          toast.error(`Something wrong to create song`);
        }
      } catch (error) {
        console.log(error);
      }
      return false;
    },
    [album, createSong, onSongCreated]
  );

  return <CreateSongForm onSubmit={handleCreateSong} />;
};

export default CreateSong;
