import { useMemo } from "react";
import { selectArtists, useSelector } from "@/lib/redux";
import { useWallets } from "@/contexts/Wallets";

export const useFindArtist = () => {
  const { walletAddress } = useWallets();
  const artists = useSelector(selectArtists);

  return useMemo(() => {
    if (artists && artists.length) {
      return artists.find((i) => i.to === walletAddress);
    }
    return undefined;
  }, [artists, walletAddress]);
};
