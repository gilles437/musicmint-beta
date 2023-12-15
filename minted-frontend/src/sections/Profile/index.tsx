import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProfileForm, { Profile, ProfileInput } from './ProfileForm';
import { addArtist } from '@/firebase/config';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { createIpfsUrl } from '@/utils/ipfs';
import { getActiveAccount } from '@/utils/account';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';

type Props = {
  address: string;
  readonly: boolean;
};

const ArtistProfile = ({ address, readonly }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const metadata = useArtistMetadata(address);

  useEffect(() => {
    metadata && setProfile(metadata);
  }, [metadata]);

  const handleUpdateProfile = async (input: ProfileInput) => {
    console.log('handleUpdateProfile', input);
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

      const account = getActiveAccount();
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

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        {/* <div className="text-center mb-3">
          <h2>Your Profile</h2>
        </div> */}

        <ProfileForm profile={profile} onSubmit={handleUpdateProfile} readonly={readonly} />
      </div>
    </section>
  );
};

export default ArtistProfile;
