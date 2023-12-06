import { useMemo } from "react";
import { selectAlbums, useSelector } from "@/lib/redux";

export const useFindAlbumById = (albumId: string) => {
  const albumList = useSelector(selectAlbums);

  return useMemo(() => {
    if (albumId) {
      return (albumList || []).find((i) => i.id === albumId);
    }
    return undefined;
  }, [albumList, albumId]);
};
