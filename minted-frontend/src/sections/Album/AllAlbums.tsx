import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchAllAlbumsAsync,
  fetchArtistListAsync,
  Album,
} from '@/lib/redux';
import { useFindArtist } from '@/hooks/useFindArtist';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from '@/components/Album/AlbumTable';

const AllAlbums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();

  const fetchAlbumList = useCallback(() => {
    dispatch(fetchAllAlbumsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArtistListAsync());
    fetchAlbumList();
  }, [dispatch, fetchAlbumList]);

  const handleBuyAlbum = (album: Album) => {
    console.log('handleBuyAlbum', album);
  };

  return (
    <section className="projects section-padding style-12">
      <div className="container">
        <div className="text-center mb-3">
          <h2>Albums</h2>
        </div>
        <div className="mb-5">
          {!!artist && (
            <Link className="d-flex" href="/album/owned">
              <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                My Albums
              </button>
            </Link>
          )}
          <div className="col-sm-12">
            <AlbumTable
              albums={albums}
              showOwner={true}
              actions={(album: Album) => {
                const activeAccount = getActiveAccount();
                return (
                  <>
                    {activeAccount !== album.from && (
                      <button
                        className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
                        onClick={() => handleBuyAlbum(album)}
                      >
                        Buy
                      </button>
                    )}
                  </>
                );
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllAlbums;
