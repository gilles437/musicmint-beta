import { BN, formatBalance } from '@polkadot/util';
import { useCallback } from 'react';
import { selectSoldAlbums, useSelector } from '@/lib/redux';
import { useChainDecimals } from './contract/useChainDecimals';

export const useAlbumStats = () => {
  const chainDecimals = useChainDecimals();
  const soldAlbums = useSelector(selectSoldAlbums);

  const getSoldAlbums = useCallback(
    (contract: string, albumId: number) => {
      if (soldAlbums?.length) {
        return soldAlbums.filter(
          (album) => album.contract === contract && album.albumid === albumId
        );
      }
      return undefined;
    },
    [soldAlbums]
  );

  const getSoldAmount = useCallback(
    (contract: string, albumId: number) => {
      const albums = getSoldAlbums(contract, albumId);
      return albums?.length;
    },
    [getSoldAlbums]
  );

  const getGainAmount = useCallback(
    (contract: string, albumId: number) => {
      if (chainDecimals) {
        const albums = getSoldAlbums(contract, albumId);
        if (albums) {
          const value = albums.reduce((amount, album) => amount.add(new BN(album.price)), new BN(0));
          formatBalance.setDefaults({ unit: 'AFT', decimals: chainDecimals });
          return formatBalance(value, { forceUnit: 'AFT', decimals: chainDecimals });
        }
      }
      return undefined;
    },
    [chainDecimals, getSoldAlbums]
  );

  return {
    getSoldAmount,
    getGainAmount,
  };
};
