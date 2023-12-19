import { useCallback } from 'react';
import { Album, Song, removeAlbum, removeSong, useDispatch } from '@/lib/redux';

export const useRemoveAlbum = () => {
  const dispatch = useDispatch();

  return useCallback(
    (album: Album) => {
      album && dispatch(removeAlbum(album));
    },
    [dispatch]
  );
};

export const useRemoveSong = () => {
  const dispatch = useDispatch();

  return useCallback(
    (song: Song) => {
      song && dispatch(removeSong(song));
    },
    [dispatch]
  );
};
