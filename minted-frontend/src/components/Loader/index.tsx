import React, { CSSProperties } from 'react';
import CircleLoader from 'react-spinners/ClipLoader';

const override: CSSProperties = {
  display: 'block',
  margin: '0 auto',
};

const Loader = ({ size = 160 }: { size: number }) => {
  return (
    <CircleLoader
      color="#36d7b7"
      loading={true}
      size={size}
      cssOverride={override}
    />
  );
};

export default Loader;
