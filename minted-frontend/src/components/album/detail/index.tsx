import React, { useState, useEffect, CSSProperties } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CircleLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
};

type SongMetadataType = {
  title: string;
  price: string;
  maxSupply: string;
  image: string;
  sound: string;
};

type AlbumMetadataType = {
  name: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

const DetailAlbum = () => {
  const [currentTitle, setCurrentTitle] = useState<string>("");
  const [currentDescription, setCurrentDescription] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState<string>("");
  const [currentAlbumMetaData, setCurrentAlbumMetaData] =
    useState<AlbumMetadataType>();
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>("");
  const [songMetaData, setSongMetaData] = useState<SongMetadataType[]>([]);
  const [currentId, setCurrentId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      // const routerId = router.query.id as string;
      // const tempId = Number(routerId);
      // setCurrentId(Number(routerId));
      const tempId = 3;
      setCurrentId(3);

      const storageAlbumsData = localStorage.getItem("albums");
      const storageAlbums = storageAlbumsData
        ? JSON.parse(storageAlbumsData)
        : [];
      console.log({ tempId, storageAlbums }, storageAlbums[tempId]);
      if (storageAlbums.length && storageAlbums[tempId]) {
        console.log("useEffect", storageAlbums[tempId]);

        const axiosConfig = {
          method: "get",
          url: `https://ipfs.io/ipfs/${storageAlbums[tempId].metadata}`,
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
        };
        try {
          const temp = await axios(axiosConfig);
          const data: AlbumMetadataType = temp.data;
          setCurrentAlbumMetaData(data);
          setCurrentTitle(data.title);
          setCurrentDescription(data.description);
          setCurrentPrice(data.price);
          setSelectedImageFileCid(data.image);
          console.log({ temp });
        } catch (error) {
          console.error(error);
          return null;
        }

        const storageSongMetaData = (
          await Promise.all(
            storageAlbums[tempId].songs.map(async (song: string) => {
              const axiosConfig = {
                method: "get",
                url: `https://ipfs.io/ipfs/${song}`,
                headers: {
                  accept: "application/json",
                  "Content-Type": "application/json",
                },
              };

              try {
                const { data } = await axios(axiosConfig);
                return data;
              } catch (error) {
                console.error(error);
                return null;
              }
            })
          )
        ).filter((data) => data !== null);
        console.log({ storageSongMetaData });
        setSongMetaData(storageSongMetaData);
      }
    })();
  }, []);

  const returnImageURL = (url: string) => {
    return url.replace(/https:\/\/ipfs\.io\/ipfs\//g, "");
  };

  const toastFunction = (string: any) => {
    toast.info(string, { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <section className="projects section-padding style-12">
      {isLoading ? (
        <CircleLoader
          color="#36d7b7"
          loading={isLoading}
          size={350}
          cssOverride={override}
        />
      ) : (
        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <div className="mt-3 album-bottom-border">
                <h2>{currentTitle ? currentTitle : ""}</h2>
              </div>
              <div className="mt-3 album-bottom-border">
                <h5>Price</h5>
                <h4>{currentPrice ? currentPrice : ""} AFT</h4>
                <p>$ 6.68 USD</p>
              </div>
              <div className="mt-3 album-bottom-border">
                <p>{currentDescription ? currentDescription : ""}</p>
              </div>
              <div className="mt-3 d-grid">
                <button
                  className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                  disabled={isLoading}
                >
                  Buy Album
                </button>
              </div>
            </div>
            <div className="col-md-6 col-sm-12">
              <div>
                <img
                  src={`https://ipfs.io/ipfs/${returnImageURL(
                    selectedImageFileCid
                  )}`}
                  className="w-100"
                ></img>
              </div>
            </div>
          </div>
          <div className="text-center mt-5"></div>

          <div className="mt-3" style={{ borderTop: "1px solid" }}>
            <h2 className="mt-3">Songs</h2>
            {songMetaData.length > 0 ? (
              <div className="mb-5">
                <div className="row">
                  <div className="col-sm-12 col-md-12">
                    <div className="mt-5 table-responsive">
                      <table className="table table-hover table-success table-striped">
                        <thead className="thead-dark">
                          <tr>
                            <th scope="col">Title</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                            <th scope="col">MaxSupply</th>
                            <th scope="col">Price</th>
                            <th scope="col">Created On</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {songMetaData.map(
                            (song: SongMetadataType, index: number) => (
                              <tr key={index}>
                                <td scope="row">{song.title}</td>
                                <td>
                                  <img
                                    src={song.image}
                                    alt=""
                                    style={{
                                      width: "60px",
                                      height: "60px",
                                    }}
                                  />
                                </td>
                                <td>
                                  <audio controls>
                                    <source
                                      src={song.sound}
                                      type="audio/mpeg"
                                    />
                                    Your browser does not support the audio
                                    element.
                                  </audio>
                                </td>
                                <td>{song.maxSupply}</td>
                                <td>{song.price}</td>
                                <td>09:35 11/02/2023</td>
                                <td>
                                  <button
                                    className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                                    disabled={isLoading}
                                  >
                                    Buy Song
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        newestOnTop={true}
        autoClose={5000}
        pauseOnHover
        pauseOnFocusLoss
        draggable
      />
    </section>
  );
};

export default DetailAlbum;
