import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Profile } from './ProfileForm';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';

type Props = {
  address: string;
};

const AboutArtist = ({ address }: Props) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const { data: metadata } = useArtistMetadata(address);

  useEffect(() => {
    setProfile(metadata);
  }, [metadata]);

  return (
    <div className="row">
      <div className="col-sm-12 col-md-6">
        <h1>{profile?.name}</h1>
        <h4>{profile?.description}</h4>
      </div>
      <div className="col-sm-12 col-md-6 text-right">
        {profile?.image && (
          <Image src={profile?.image || ''} alt="Avatar" width={460} height={460} />
        )}
      </div>
    </div>
  );
};

export default AboutArtist;
