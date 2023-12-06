import { useMemo } from 'react';
import { selectAlbums, useSelector } from '@/lib/redux';

export const useFindAlbumById = (contract: string, albumId: number) => {
  const albumList = useSelector(selectAlbums);

  return useMemo(() => {
    if (albumId) {
      return (albumList || []).find(
        (i) => i.contract === contract && i.albumid === albumId
      );
    }
    return undefined;
  }, [albumList, contract, albumId]);
};
