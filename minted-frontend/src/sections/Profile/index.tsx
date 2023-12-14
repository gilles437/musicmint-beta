import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import ProfileForm, { Profile, ProfileInput } from './ProfileForm';
import { uploadFile, uploadMetadata } from '@/utils/bucket';
import { createIpfsUrl } from '@/utils/ipfs';

const CreateProfile = () => {
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchProfiles = async () => {
      const storageProfileData = localStorage.getItem('profile');
      const storageProfile = storageProfileData ? JSON.parse(storageProfileData) : null;
      if (storageProfile) {
        const axiosConfig = {
          method: 'get',
          url: createIpfsUrl(storageProfile),
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
          },
        };
        try {
          const res = await axios(axiosConfig);
          if (res) {
            const _profile: Profile = res.data;
            _profile && setProfile(_profile);
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      }
    };

    setIsLoading(true);
    fetchProfiles()
      .then((result: any) => {})
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

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

        <ProfileForm profile={profile} onSubmit={handleUpdateProfile} />
      </div>
    </section>
  );
};

export default CreateProfile;
