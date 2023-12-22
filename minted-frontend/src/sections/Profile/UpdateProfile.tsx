import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Button from 'react-bootstrap/esm/Button';
import Loader from '@/components/Loader';
import { addArtist } from '@/firebase/config';
import { useAlbum } from '@/hooks/useAlbum';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';
import { useFetchOwnedAlbums } from '@/hooks/useFetchOwnedAlbums';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { createIpfsUrl } from '@/utils/ipfs';
import ProfileForm, { Profile, ProfileInput } from './ProfileForm';

type Props = {
  address: string;
};

const UpdateProfile = ({ address }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { data: metadata, loading: loadingMetadata } = useArtistMetadata(address);
  const { data: albums } = useFetchOwnedAlbums(address);
  const { withdraw } = useAlbum(albums?.length ? albums[0].contract : null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setProfile(metadata);
  }, [metadata]);

  const handleUpdateProfile = async (input: ProfileInput) => {
    console.log('handleUpdateProfile', input);
    if (!address) {
      toast.error('Please connect your wallet!');
      return false;
    }

    try {
      const imageCid = await uploadFile(input.image!);
      if (!imageCid) {
        console.error('error when uploading image nft');
        return false;
      }

      const _profile: Profile = {
        name: input.name,
        description: input.description,
        image: createIpfsUrl(imageCid),
        twitter: input.twitter,
        instagram: input.instagram,
        youtube: input.youtube,
      };
      const metadataId = await uploadMetadata(_profile);
      if (!metadataId) {
        console.error('error when uploading metadata');
        return false;
      }

      const metaUrl = createIpfsUrl(metadataId);
      toast.info(`Profile updated on ${metaUrl}`);

      const account = address;
      const payload = {
        name: input.name,
        url: metaUrl,
      };
      const res = await addArtist(account, payload);
      console.log(`firebase.addArtist`, res);

      setProfile(_profile);
      localStorage.setItem('profile', JSON.stringify(metadataId));
      return true;
    } catch (err: any) {
      console.error(err);
    }

    toast.error(`Something wrong to create song`);
    return false;
  };

  const handleWithdraw = async () => {
    try {
      setLoading(true);
      const amount = await withdraw();
      console.log('withdraw.amount', amount);

      toast.success("You have been successfully withdraw");
      return true;
    } catch (err: any) {
      if (err && err.message === 'Cancelled') {
        toast.error(`Transaction cancelled`);
        return false;
      }
    } finally {
      setLoading(false);
    }

    toast.error('Something went wrong!');
    return false;
  };

  if (loadingMetadata) {
    return <Loader />;
  }

  return (
    <>
      {/* <div className="text-center mb-3">
        <h2>Your Profile</h2>
      </div> */}

      <div className="text-center mb-3">
        <Button
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          onClick={handleWithdraw}
        >
          Withdraw
        </Button>
        <span style={{ paddingLeft: 20 }}>Balance: 0</span>
      </div>

      <ProfileForm profile={profile} onSubmit={handleUpdateProfile} />
    </>
  );
};

export default UpdateProfile;
