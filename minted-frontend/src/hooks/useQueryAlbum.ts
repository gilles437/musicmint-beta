import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAlbumByIdAsync, selectAlbums, useDispatch, useSelector } from '@/lib/redux';
import { isNotNullOrUndefined } from '@/utils/utils';

export const useQueryAlbum = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const [contract, setContract] = useState<string>();
  const [albumId, setAlbumId] = useState<number>();

  useEffect(() => {
    if (query?.contract && query?.albumId) {
      const _contract = query.contract as string;
      setContract(_contract);

      const _albumId = Number(query.albumId as string);
      setAlbumId(_albumId);

      dispatch(fetchAlbumByIdAsync({ contract: _contract, albumId: _albumId }));
    }
  }, [dispatch, query?.contract, query?.albumId]);

  return useMemo(() => {
    if (contract && isNotNullOrUndefined(albumId)) {
      return (albums || []).find(
        (i) => i.contract === contract && Number(i.albumid) === Number(albumId)
      );
    }
    return undefined;
  }, [albums, contract, albumId]);
};
