import { useCallback } from "react";
import { useSelector } from "@/lib/redux";

export const useFindAddress = () => {
  const { superAdmins, artists } = useSelector((state) => state.admin);

  return useCallback(
    (address: string) => {
      return (
        superAdmins.some((i) => i.to === address) ||
        artists.some((i) => i.to === address)
      );
    },
    [superAdmins, artists]
  );
};
