import React, { CSSProperties } from 'react';
import CircleLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const Loader = () => {
  return (
    <CircleLoader
      color="#36d7b7"
      loading={true}
      size={350}
      cssOverride={override}
    />
  );
};

export default Loader;
