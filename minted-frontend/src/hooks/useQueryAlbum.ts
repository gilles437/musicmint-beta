import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAlbumByIdAsync, selectAlbums, useDispatch, useSelector } from '@/lib/redux';
import { isNotNullOrUndefined } from '@/utils/utils';

export const useQueryAlbum = () => {
  const { query } = useRouter();
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const [owner, setOwner] = useState<string>();
  const [albumId, setAlbumId] = useState<number>();

  useEffect(() => {
    if (query?.owner && query?.albumId) {
      const from = query.owner as string;
      setOwner(from);

      const _albumId = Number(query.albumId as string);
      setAlbumId(_albumId);

      dispatch(fetchAlbumByIdAsync({ owner: from, albumId: _albumId }));
    }
  }, [dispatch, query?.owner, query?.albumId]);

  return useMemo(() => {
    if (owner && isNotNullOrUndefined(albumId)) {
      return (albums || []).find(
        (i) => i.from === owner && Number(i.albumid) === Number(albumId)
      );
    }
    return undefined;
  }, [albums, owner, albumId]);
};
