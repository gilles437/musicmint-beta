import { ContractPromise } from '@polkadot/api-contract';
import { useCallback, useMemo } from 'react';

import contractAbi from '@/contracts/album/albums.json';
import { useWallets } from '@/contexts/Wallets';
import { getActiveAccount } from '@/utils/account';

import { useApi } from './useApi';
import { useGasLimit } from './useGasLimit';
import { useChainDecimals } from './useChainDecimals';

interface ContractEventsType {
  dispatchInfo: {};
  events: [];
  status: {};
  txHash: string;
  txIndex: number;
  blockNumber: string;
  contractEvents: [
    {
      args: string[];
      docs: [];
      identifier: string;
      index: number;
    }
  ];
}

export const useAlbumContract = (contractAddress?: string) => {
  const api = useApi();
  const gasLimit = useGasLimit(api);
  const chainDecimals = useChainDecimals(api);
  const { wallet } = useWallets();

  const contract = useMemo(() => {
    if (api && contractAddress) {
      return new ContractPromise(api, contractAbi, contractAddress);
    }
    return null;
  }, [api, contractAddress]);

  const createAlbum = useCallback(
    async (
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string,
      callback: (albumId: string) => void
    ): Promise<boolean> => {
      if (!api || !contract) {
        console.error('Api is not ready');
        return false;
      }
      console.log('****wallet', wallet);
      if (!wallet) {
        console.error('Please connect your wallet!');
        return false;
      }

      const account = getActiveAccount();
      console.log('****account', account);

      const options = { value: 0, storageDepositLimit: null, gasLimit };
      const priceInWei = Number(tokenPrice) * 10 ** chainDecimals;

      const queryTx = await contract.query.createAlbum(
        account,
        options,
        maxSupply,
        priceInWei,
        metaUrl
      );

      console.log('*****queryTx=', queryTx);
      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.createAlbum(
        options,
        maxSupply, //max_supply
        priceInWei,
        metaUrl
      );
      console.log('*****tx=', tx);

      const parseAlbumId = (result: any) => {
        const event: ContractEventsType = JSON.parse(
          JSON.stringify(result, null, 2)
        );
        if (event.contractEvents?.length && event.contractEvents[0].args[1]) {
          return event.contractEvents[0].args[1];
        }
        return '';
      };

      const unsub = await tx.signAndSend(
        account,
        { signer: wallet.signer },
        (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (result.status.isFinalized) {
            const albumId = parseAlbumId(result);
            console.log('*****tx**result**albumId=', albumId);
            callback(albumId);
            unsub();
          }
        }
      );
      return true;
    },
    [api, contract, gasLimit, wallet]
  );

  const createSong = useCallback(
    async (
      albumId: string,
      maxSupply: number,
      tokenPrice: number,
      metaUrl: string,
      callback: (albumId: string) => void
    ): Promise<boolean> => {
      if (!api || !contract) {
        console.error('Api is not ready');
        return false;
      }
      console.log('****wallet', wallet);
      if (!wallet) {
        console.error('Please connect your wallet!');
        return false;
      }

      const account = getActiveAccount();
      console.log('****account', account);

      const options = { value: 0, storageDepositLimit: null, gasLimit };
      const priceInWei = Number(tokenPrice) * 10 ** chainDecimals;

      const queryTx = await contract.query.createSong(
        account,
        options,
        albumId,
        maxSupply,
        priceInWei,
        metaUrl
      );

      console.log('*****queryTx=', queryTx);
      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.createSong(
        options,
        albumId,
        maxSupply,
        priceInWei,
        metaUrl
      );
      console.log('*****tx=', tx);

      const parseSongId = (result: any) => {
        const event: ContractEventsType = JSON.parse(
          JSON.stringify(result, null, 2)
        );
        if (event.contractEvents?.length && event.contractEvents[0].args[1]) {
          return event.contractEvents[0].args[1];
        }
        return '';
      };

      const unsub = await tx.signAndSend(
        account,
        { signer: wallet.signer },
        (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (result.status.isFinalized) {
            const songId = parseSongId(result);
            console.log('*****tx**result**albumId=', songId);
            callback(songId);
            unsub();
          }
        }
      );
      return true;
    },
    [api, contract, gasLimit, wallet]
  );

  const deleteSong = useCallback(
    async (
      albumId: string,
      songId: string,
      callback: (albumId: string) => void
    ): Promise<boolean> => {
      if (!api || !contract) {
        console.error('Api is not ready');
        return false;
      }
      console.log('****wallet', wallet);
      if (!wallet) {
        console.error('Please connect your wallet!');
        return false;
      }

      const account = getActiveAccount();
      console.log('****account', account);

      const options = { value: 0, storageDepositLimit: null, gasLimit };
      const queryTx = await contract.query.deleteSong(
        account,
        options,
        albumId,
        songId,
      );

      console.log('*****queryTx=', queryTx);
      if (!queryTx.result?.isOk) {
        console.error('****queryTx.error', queryTx.result.asErr);
        return false;
      }

      const tx = await contract.tx.deleteSong(
        options,
        albumId,
        songId,
      );
      console.log('*****tx=', tx);

      const unsub = await tx.signAndSend(
        account,
        { signer: wallet.signer },
        (result) => {
          console.log('*****tx**result=', result.status.isFinalized);
          if (result.status.isFinalized) {
            callback(albumId);
            unsub();
          }
        }
      );
      return true;
    },
    [api, contract, gasLimit, wallet]
  );

  return {
    createAlbum,
    createSong,
    deleteSong,
  };
};
