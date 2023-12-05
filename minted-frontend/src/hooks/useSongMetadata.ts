import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import {
  Song,
  SongMetadata,
  selectSongMetadata,
  setSongMetadata,
  useDispatch,
  useSelector,
} from '@/lib/redux';

const fetchSongMetadata = (url: string) => {
  const request = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };
  return axios(request)
    .then(({ data }: { data: SongMetadata }) => {
      return data;
    })
    .catch((e) => {
      console.error(e);
      return null;
    });
};

export const useSongMetadata = (song?: Song | null) => {
  const dispatch = useDispatch();
  const metadataDict = useSelector(selectSongMetadata);

  const metadata = useMemo(() => {
    if (song?.id) {
      if (metadataDict && metadataDict[song.id]) {
        return metadataDict[song.id];
      }
    }
    return null;
  }, [metadataDict, song]);

  useEffect(() => {
    if (song && song.uri && !metadata) {
      fetchSongMetadata(song.uri).then((meta) => {
        meta && dispatch(setSongMetadata({ metadata: meta, id: song.id }));
      });
    }
  }, [song, metadata]);

  return metadata;
};
