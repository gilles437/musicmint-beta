import { useMemo } from 'react';
import { selectAlbums, useSelector } from '@/lib/redux';
import { useRouter } from 'next/router';

export const useQueryAlbum = () => {
  const { query } = useRouter();
  const albumList = useSelector(selectAlbums);

  return useMemo(() => {
    if (query?.contract && query?.albumId) {
      const contract = query.contract as string;
      const albumId = query.albumId as string;
      return (albumList || []).find(
        (i) => i.contract === contract && Number(i.albumid) === Number(albumId)
      );
    }
    return undefined;
  }, [albumList, query?.contract, query?.albumId]);
};
