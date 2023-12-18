import React from 'react';

type Props = {
  aboutTab: React.ReactElement;
  releaseTab: React.ReactElement;
};

const ProfileTab = ({ aboutTab, releaseTab }: Props) => {
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
        <div
          className="tab-pane fade show active"
          id="nav-about"
          role="tabpanel"
          aria-labelledby="nav-about-tab"
        >
          {aboutTab}
        </div>
        <div
          className="tab-pane fade"
          id="nav-releases"
          role="tabpanel"
          aria-labelledby="nav-releases-tab"
        >
          {releaseTab}
        </div>
      </div>
    </>
  );
};

export default ProfileTab;
