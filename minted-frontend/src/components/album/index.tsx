import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchAlbumListAsync,
  selectArtists,
  Artist,
  fetchArtistListAsync,
} from '@/lib/redux';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from './AlbumTable';

const Album = () => {
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);
  const albums = useSelector(selectAlbums);
  const [artist, setArtist] = useState<Artist | null>(null);

  const fetchAlbumList = useCallback((owner: string) => {
    dispatch(fetchAlbumListAsync(owner));
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArtistListAsync());

    const account = getActiveAccount();
    fetchAlbumList(account);
  }, [dispatch, fetchAlbumList]);

  useEffect(() => {
    if (artists?.length) {
      const account = getActiveAccount();
      const artist = artists.find((i) => i.to === account);
      artist && setArtist(artist);
    }
  }, [artists]);

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
          {!!artist && (
            <Link
              className="d-flex"
              href={{
                pathname: `/album/create`,
                query: { contract: artist.contract },
              }}
            >
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                Create Album
              </button>
            </Link>
          )}
          <div className="col-sm-12">
            <AlbumTable albums={albums} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Album;
