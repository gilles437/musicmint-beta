import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

import Loader from '@/components/Loader';
import { AlbumMetadata, fetchAlbumByIdAsync, useDispatch } from '@/lib/redux';
import { createIpfsUrl } from '@/utils/ipfs';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { useAlbum } from '@/hooks/useAlbum';

import CreateAlbumForm, { CreateAlbumInput } from './AlbumForm';

const CreateAlbum = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [contractAddress, setContractAddress] = useState('');
  const { createAlbum } = useAlbum(contractAddress);

  useEffect(() => {
    if (router.query?.contract) {
      setContractAddress(router.query?.contract as string);
    }
  }, [router.query?.contract]);

  const onAlbumCreated = async (albumId: number) => {
    console.log('onAlbumCreated', albumId);
    await dispatch(fetchAlbumByIdAsync({ contract: contractAddress, albumId }));

    const timerId = setTimeout(() => {
      router.push(`/album/edit?contract=${contractAddress}&albumId=${albumId}`)
    }, 2000);
    return () => clearTimeout(timerId);
  };

  const handleCreateAlbum = async (input: CreateAlbumInput) => {
    console.log('handleCreateAlbum', input);
    try {
      setIsLoading(true);

      const imageCid = await uploadFile(input.image!);
      if (!imageCid) {
        console.error('error when uploading image nft');
        return false;
      }

      const metadata: AlbumMetadata = {
        name: input.image ? input.image.name.toString() : '',
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
      const success = await createAlbum(
        Number(input.maxSupply),
        Number(input.price),
        metaUrl,
        (albumId: number) => {
          setIsLoading(false);
          onAlbumCreated(albumId);
          toast.info(`New Album TokenId is: ${Number(albumId)}`);
        }
      );
      console.log('success', success);

      if (success) {
        toast.info(`New Album Metadata saved on ${metaUrl}`);
        return true;
      } else {
        setIsLoading(false);
        toast.error(`Something wrong to create Album`);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
    return false;
  };

  if (isLoading) {
    return <Loader />;
  }

  return <CreateAlbumForm onSubmit={handleCreateAlbum} />;
};

export default CreateAlbum;
