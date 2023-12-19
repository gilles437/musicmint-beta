import { useWallets } from '@/contexts/Wallets';

import AlbumTable from '@/components/Album/AlbumTable';
import SongTable from '@/components/AlbumSong/SongTable';

import { useFetchMintedAlbums } from '@/hooks/useFetchMintedAlbums';
import { useFetchMintedSongs } from '@/hooks/useFetchMintedSongs';
import { isNotNullOrUndefined } from '@/utils/utils';

const MyNFTs = () => {
  const { walletAddress } = useWallets();
  const { data: mintedAlbums, loading: isLoadingAlbums } = useFetchMintedAlbums(walletAddress);
  const { data: mintedSongs, loading: isLoadingSongs } = useFetchMintedSongs(walletAddress);

  return (
    <>
      <div className="text-center mb-3">
        <h2>My Albums</h2>
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
          <AlbumTable albums={mintedAlbums} loading={isLoadingAlbums} clickable />
        </div>

        <div className="text-center mt-3 mb-3">
          <h2>My Songs</h2>
        </div>
        <div className="col-sm-12">
          <SongTable songs={mintedSongs} loading={isLoadingSongs} />
        </div>
      </div>
    </>
  );
};

export default MyNFTs;
