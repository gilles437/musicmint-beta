import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-toastify';
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
import { useAlbumContract } from '@/hooks/useAlbumContract';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from '@/components/Album/AlbumTable';

const toastFunction = (string: any) => {
  toast.info(string, { position: toast.POSITION.TOP_RIGHT });
};

const AllAlbums = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();
  const { mintAlbum } = useAlbumContract();

  const fetchAlbumList = useCallback(() => {
    dispatch(fetchAllAlbumsAsync());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchArtistListAsync());
    fetchAlbumList();
  }, [dispatch, fetchAlbumList]);

  const handleBuyAlbum = async (album: Album) => {
    console.log('handleBuyAlbum', album);
    try {
      await mintAlbum(album.albumid, album.contract, () => {
        toastFunction("You have successfully minted the album");
      });
    } catch (err) {
      console.error(err);
    }
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
