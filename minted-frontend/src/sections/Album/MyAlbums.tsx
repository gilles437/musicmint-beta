import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  useSelector,
  useDispatch,
  selectAlbums,
  fetchOwnedAlbumListAsync,
  fetchArtistListAsync,
  Album,
} from '@/lib/redux';
import { useFindArtist } from '@/hooks/useFindArtist';
import { getActiveAccount } from '@/utils/account';
import AlbumTable from '@/components/Album/AlbumTable';

const Album = () => {
  const dispatch = useDispatch();
  const albums = useSelector(selectAlbums);
  const artist = useFindArtist();

  const fetchAlbumList = useCallback(
    (owner: string) => {
      dispatch(fetchOwnedAlbumListAsync(owner));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchArtistListAsync());

    const account = getActiveAccount();
    fetchAlbumList(account);
  }, [dispatch, fetchAlbumList]);

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
            <AlbumTable
              albums={albums}
              actions={(album: Album) => (
                <Link href={`/album/edit?id=${album.id}`}>
                  <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
                    Edit
                  </button>
                </Link>
              )}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Album;
