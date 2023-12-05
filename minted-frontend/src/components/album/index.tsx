import { useState, useEffect, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchAlbumListAsync,
  Album,
} from "@/lib/redux";

const Album = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);

  const [isArtist, setIsArtist] = useState<Boolean>(true);
  const [contractAddress, setContractAddress] = useState<string | null>('5HFo61hpJxcg52VV1ENnAbHHsKwhTLaADtYQqe5jRJmsH224'); //TODO

  const fetchAlbumList = useCallback((owner: string) => {
    dispatch(fetchAlbumListAsync(owner));
  }, [dispatch]);

  useEffect(() => {
    fetchAlbumList('5D4Q5sf67ZyNNLsRff8g2hWa5T3Z9HeCfbC9EXV8b1x7uVmy'); //TODO
  }, [fetchAlbumList]);

  useEffect(() => {
    // const getStorageAlbum = async () => {
    //   const storageAlbumsData = localStorage.getItem("albums");
    //   const storageAlbums = storageAlbumsData
    //     ? JSON.parse(storageAlbumsData)
    //     : [];

    //   if (storageAlbums.length) {
    //     const albumMetaData = (
    //       await Promise.all(
    //         storageAlbums.map(async (album: storageAlbumType) => {
    //           const axiosConfig = {
    //             method: "get",
    //             url: `https://ipfs.io/ipfs/${album.metadata}`,
    //             headers: {
    //               accept: "application/json",
    //               "Content-Type": "application/json",
    //             },
    //           };

    //           try {
    //             const { data } = await axios(axiosConfig);
    //             return data;
    //           } catch (error) {
    //             console.error(error);
    //             return null;
    //           }
    //         })
    //       )
    //     ).filter((data) => data !== null);
    //     setAlbumMetaData(albumMetaData);
    //   }
    // };
    // getStorageAlbum()
    //   .then(() => {})
    //   .catch(() => {});
  }, []);

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center mb-3">
          <h2>My Albums</h2>
        </div>
        <div className="mb-5">
          {isArtist ? (
            <Link className="d-flex" href={{ pathname: "/album/create", query: { contract: contractAddress }}} >
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                Create Album
              </button>
            </Link>
          ) : (
            ""
          )}
          <div className="col-sm-12">
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
                  {(albums || []).map(
                    (album: Album, index: number) => (
                      <tr key={index}>
                        <td scope="row">{album.title}</td>
                        <td>
                          <img
                            src={album.image}
                            alt="Album"
                            style={{ width: "60px", height: "60px" }}
                          />
                        </td>
                        <td>{album.price}</td>
                        <td>{dayjs(album.timestamp).format('MM/DD/YYYY HH:mm')}</td>
                        <td>
                          <Link href={`/album/edit?id=${index}`}>
                            <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                              Edit
                            </button>
                          </Link>
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
