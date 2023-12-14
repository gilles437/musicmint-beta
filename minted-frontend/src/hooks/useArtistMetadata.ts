import { useCallback, useEffect, useMemo } from 'react';
import {
  selectArtistMetadata,
  setArtistMetadata,
  useDispatch,
  useSelector,
} from '@/lib/redux';
import { findArtist } from '@/firebase/config';
import { fetchMetadata } from './useAlbumMetadata';

export const useArtistMetadata = (address: string) => {
  const dispatch = useDispatch();
  const metadataDict = useSelector(selectArtistMetadata);

  const metadata = useMemo(() => {
    if (address) {
      if (metadataDict && metadataDict[address]) {
        return metadataDict[address];
      }
    }
    return null;
  }, [metadataDict, address]);

  const updateArtistMetadata = useCallback(async (address: string) => {
    const fbdoc = await findArtist(address);
    if (fbdoc) {
      return await fetchMetadata(fbdoc.url);
    }
    return null;
  }, []);

  useEffect(() => {
    if (address && !metadata) {
      updateArtistMetadata(address).then((meta) => {
        meta && dispatch(setArtistMetadata({ metadata: meta, address }));
      });
    }
  }, [address, metadata, updateArtistMetadata]);

  return metadata;
};
