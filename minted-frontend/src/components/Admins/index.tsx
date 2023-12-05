import React, { useState, CSSProperties } from "react";
import CircleLoader from "react-spinners/ClipLoader";
import ArtistsSection from "./ArtistsSection";
import SuperAdminSection from "./SuperAdminSection";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

const ContractAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        {isLoading ? (
          <CircleLoader
            color="#36d7b7"
            loading={isLoading}
            size={350}
            cssOverride={override}
          />
        ) : (
          <>
            <ArtistsSection />
            <SuperAdminSection />
          </>
        )}
      </div>
    </section>
  );
};

export default ContractAdmin;
