import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

type storageAlbumType = {
  id: string;
  metadata: string;
  songs: [];
};

type AlbumMetadataType = {
  name: string;
  title: string;
  description: string;
  price: string;
  image: string;
};

const Album = () => {
  const [albumMetaData, setAlbumMetaData] = useState<AlbumMetadataType[]>([]);

  useEffect(() => {
    (async () => {
      const storageAlbumsData = localStorage.getItem("albums");
      const storageAlbums = storageAlbumsData
        ? JSON.parse(storageAlbumsData)
        : [];
      if (storageAlbums.length) {
        const albumMetaData = (
          await Promise.all(
            storageAlbums.map(async (album: storageAlbumType) => {
              const axiosConfig = {
                method: "get",
                url: `https://ipfs.io/ipfs/${album.metadata}`,
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
        setAlbumMetaData(albumMetaData);
      }
    })();
  }, []);

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center mb-3">
          <h2>My Albums</h2>
        </div>
        <div className="mb-5">
          <Link href="/album/create" className="d-flex">
            <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
              Create Album
            </button>
          </Link>
          <div className="col-sm-12 col-md-9">
            <div className="mt-5 table-responsive">
              <table className="table table-hover table-success table-striped">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Address</th>
                    <th scope="col"></th>
                    <th scope="col">Price</th>
                    <th scope="col">Created On</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {albumMetaData.length > 0
                    ? albumMetaData.map(
                        (song: AlbumMetadataType, index: number) => (
                          <tr key={index}>
                            <td scope="row">{song.title}</td>
                            <td>
                              <img
                                src={song.image}
                                alt=""
                                style={{ width: "60px", height: "60px" }}
                              />
                            </td>
                            <td>{song.price}</td>
                            <td>09:35 11/02/2023</td>
                            <td>
                              <Link href={`/album/edit?id=${index}`}>
                                <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                                  Edit
                                </button>
                              </Link>
                            </td>
                          </tr>
                        )
                      )
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
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

export default Album;
