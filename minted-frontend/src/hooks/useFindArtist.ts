import { useMemo } from "react";
import { selectArtists, useSelector } from "@/lib/redux";
import { getActiveAccount } from "@/utils/account";

export const useFindArtist = () => {
  const artists = useSelector(selectArtists);

  return useMemo(() => {
    if (artists && artists.length) {
      const account = getActiveAccount();
      return artists.find((i) => i.to === account);
    }
    return undefined;
  }, [artists]);
};
