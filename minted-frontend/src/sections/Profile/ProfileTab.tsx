import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useEffect, useMemo } from 'react';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Profile = dynamic(() => import('@/sections/Profile'), {
  ssr: false,
});

const ProfileTab = () => {
  return (
    <>
      <ul className="nav nav-underline">
        <li className="nav-item">
          <div
            className="nav-link active"
            id="nav-about-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-about"
            role="tab"
            aria-controls="nav-about"
            aria-selected="true"
          >
            <h1 style={{ cursor: 'pointer' }}>About</h1>
          </div>
        </li>
        <li className="nav-item">
          <div
            className="nav-link"
            id="nav-releases-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-releases"
            role="tab"
            aria-controls="nav-releases"
            aria-selected="false"
          >
            <h1 style={{ cursor: 'pointer' }}>Releases</h1>
          </div>
        </li>
      </ul>

      <div className="tab-content" id="nav-tabContent">
        
      </div>
    </>
  );
};

export default ProfileTab;
