import { useMemo } from 'react';
import { useWallets } from '@/contexts/Wallets';
import { useFetchArtists } from './useFetchArtists';

export const useFindArtist = () => {
  const { walletAddress } = useWallets();
  const { data: artists } = useFetchArtists();

  return useMemo(() => {
    if (artists && artists.length) {
      return artists.find((i) => i.to === walletAddress);
    }
    return undefined;
  }, [artists, walletAddress]);
};
