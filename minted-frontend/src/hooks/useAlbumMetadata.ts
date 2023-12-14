import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Album,
  AlbumMetadata,
  selectAlbumMetadata,
  setAlbumMetadata,
  useDispatch,
  useSelector,
} from '@/lib/redux';

export const fetchMetadata = (url: string) => {
  const request = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return axios(request)
    .then(({ data }: { data: any }) => {
      return data;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const useAlbumMetadata = (album?: Album | null) => {
  const dispatch = useDispatch();
  const metadataDict = useSelector(selectAlbumMetadata);

  const metadata = useMemo(() => {
    if (album?.id) {
      if (metadataDict && metadataDict[album.id]) {
        return metadataDict[album.id];
      }
    }
    return null;
  }, [metadataDict, album]);

  useEffect(() => {
    if (album && album.uri && !metadata) {
      fetchMetadata(album.uri).then((meta) => {
        meta && dispatch(setAlbumMetadata({ metadata: meta, id: album.id }));
      });
    }
  }, [album, metadata]);

  return metadata;
};
