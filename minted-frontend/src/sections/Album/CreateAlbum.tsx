import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import { AlbumMetadata, fetchAlbumByIdAsync, useDispatch } from '@/lib/redux';
import { useWallets } from '@/contexts/Wallets';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { useAlbum } from '@/hooks/useAlbum';

import CreateAlbumForm, { CreateAlbumInput } from './AlbumForm';

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [contractAddress, setContractAddress] = useState('');
  const { walletAddress } = useWallets();
  const { createAlbum } = useAlbum(contractAddress);

  useEffect(() => {
    if (router.query?.contract) {
      setContractAddress(router.query?.contract as string);
    }
  }, [router.query?.contract]);

  const onAlbumCreated = async (albumId: number) => {
    console.log('onAlbumCreated', albumId);
    walletAddress && await dispatch(fetchAlbumByIdAsync({ owner: walletAddress, albumId }));

    const timerId = setTimeout(() => {
      router.push(`/album/edit?from=${walletAddress}&albumId=${albumId}`);
    }, 2000);
    return () => clearTimeout(timerId);
  };

  const handleCreateAlbum = async (input: CreateAlbumInput) => {
    console.log('handleCreateAlbum', input);
    try {
      const imageCid = await uploadFile(input.file!);
      if (!imageCid) {
        console.error('error when uploading image nft');
        return false;
      }

      const metadata: AlbumMetadata = {
        name: input.file ? input.file.name.toString() : '',
        title: input.title,
        description: input.description,
        price: input.price,
        image: createIpfsUrl(imageCid),
      };
      const metadataId = await uploadMetadata(metadata);
      if (!metadataId) {
        console.error('error when uploading metadata');
        return false;
      }

      const metaUrl = createIpfsUrl(metadataId);
      toast.info(`New Album Metadata saved on ${metaUrl}`);

      const albumId = await createAlbum(Number(input.maxSupply), Number(input.price), metaUrl);
      console.log('albumId', albumId);

      if (albumId !== null && albumId !== undefined && albumId >= 0) {
        onAlbumCreated(albumId);
        toast.info(`New Album TokenId is: ${Number(albumId)}`);
        return true;
      }
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    }
    
    toast.error(`Something wrong to create album`);
    return false;
  };

  /*if (isLoading) {
    return <Loader />;
  }*/

  return <CreateAlbumForm onSubmit={handleCreateAlbum} />;
};

export default CreateAlbum;
