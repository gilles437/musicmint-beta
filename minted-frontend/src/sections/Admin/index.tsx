import React, { useState, CSSProperties } from 'react';
import CircleLoader from 'react-spinners/ClipLoader';
import ArtistsSection from './Artists';
import SuperAdminSection from './SuperAdmins';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const AdminIndex = () => {
  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) {
    return (
      <CircleLoader
        color="#36d7b7"
        loading={isLoading}
        size={350}
        cssOverride={override}
      />
    );
  }

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <ArtistsSection />
        <SuperAdminSection />
      </div>
    </section>
  );
};

export default AdminIndex;
