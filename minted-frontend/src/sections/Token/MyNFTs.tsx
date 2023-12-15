import { useEffect, useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  useSelector,
  useDispatch,
  selectMintedAlbums,
  fetchMintedAlbumListAsync,
  fetchMintedSongListAsync,
  fetchAllAlbumsAsync,
  Album,
  selectAlbums,
  selectSongs,
} from '@/lib/redux';
import AlbumTable from '@/components/Album/AlbumTable';
import SongTable from '@/components/AlbumSong/SongTable';
import { useAlbum } from '@/hooks/useAlbum';
import DeleteConfirmModal from '@/components/Modal/DeleteConfirmModal';
import { useWallets } from '@/contexts/Wallets';

const MyNFTs = () => {
  const dispatch = useDispatch();
  const allAlbums = useSelector(selectAlbums);
  const mintedAlbums = useSelector(selectMintedAlbums);
  const mintedSongs = useSelector(selectSongs);
  const { deleteAlbum } = useAlbum();
  const { walletAddress } = useWallets();
  const [selectedAlbum, setSelectedAlbum] = useState<Album>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllAlbumsAsync());
  }, [dispatch]);

  useEffect(() => {
    if (walletAddress) {
      dispatch(fetchMintedAlbumListAsync(walletAddress));
      dispatch(fetchMintedSongListAsync(walletAddress));
    }
  }, [dispatch, walletAddress]);

  const myAlbums = useMemo(() => {
    if (allAlbums?.length && mintedAlbums?.length) {
      const result = [];
      for (const minted of mintedAlbums) {
        const item = allAlbums.find(
          (i) => i.albumid === minted.albumid && i.contract === minted.contract
        );
        if (item) {
          result.push({ ...item, uri: item.uri });
        }
      }
      return result;
    }
    return mintedAlbums;
  }, [allAlbums, mintedAlbums]);

  const handleDeleteAlbum = async (album: Album) => {
    try {
      setLoading(true);

      const deletedAlbumId = await deleteAlbum(album.albumid, album.contract);
      if (deletedAlbumId) {
        return toast.info('You have successfully deleted your album');
      }
    } catch (err: any) {
      console.error(err);
      if (err && err.message === 'Cancelled') {
        return toast.error(`Transaction cancelled`);
      }
    } finally {
      setLoading(false);
    }
    toast.error('Something went wrong!');
  };

  const handleConfirmDeletion = () => {
    setShowDeleteConfirm(false);
    selectedAlbum && handleDeleteAlbum(selectedAlbum);
  };

  return (
    <>
      <div className="text-center mb-3">
        <h2>My NFTs</h2>
      </div>
      <div className="mb-5">
        {/* {!!artist && (
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
        )} */}
        <div className="col-sm-12">
          <AlbumTable
            albums={myAlbums}
            actions={(album: Album) => (
              <>
                {/* <Link href={`/album/edit?contract=${album.contract}&albumId=${album.albumid}`}>
                  <Button variant="link" size="sm">
                    Edit
                  </Button>
                </Link>
                <LoadingButton
                  variant="link"
                  style={{ marginLeft: '12px' }}
                  loading={!!(isLoading && selectedAlbum === album)}
                  disabled={!!isLoading}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete
                </LoadingButton> */}
              </>
            )}
          />
        </div>

        <div className="text-center mt-3 mb-3">
          <h2>My Song</h2>
        </div>
        <div className="col-sm-12">
          <SongTable
            songs={mintedSongs}
            actions={(album: Album) => (
              <>
                {/* <Link href={`/album/edit?contract=${album.contract}&albumId=${album.albumid}`}>
                  <Button variant="link" size="sm">
                    Edit
                  </Button>
                </Link>
                <LoadingButton
                  variant="link"
                  style={{ marginLeft: '12px' }}
                  loading={!!(isLoading && selectedAlbum === album)}
                  disabled={!!isLoading}
                  onClick={() => {
                    setSelectedAlbum(album);
                    setShowDeleteConfirm(true);
                  }}
                >
                  Delete
                </LoadingButton> */}
              </>
            )}
          />
        </div>
      </div>
      <DeleteConfirmModal
        show={showDeleteConfirm}
        title="Delete Album"
        description="Are you sure to delete the album?"
        onConfirm={handleConfirmDeletion}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
};

export default MyNFTs;
