import Image from 'next/image';
import Link from 'next/link';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';

type Props = {
  album: Album;
  actionButton?: (album: Album) => React.ReactElement;
};

const AlbumCard = ({ album, actionButton }: Props) => {
  const metadata = useAlbumMetadata(album);

  return (
    <div className={`mix `}>
      <Link
        href={`/album/detail?contract=${album.contract}&albumId=${album.albumid}`}
        className="project-card hover-shadow"
      >
        <div className="top-inf">
          <div>
            <div>Max Supply</div>
            <div className="color-yellowGreen">
              {album.maxsupply} / {album.maxsupply}
            </div>
          </div>
          <div>
            <div>Price</div>
            <div className="color-yellowGreen">{metadata?.price} AFT</div>
          </div>
        </div>
        <div className="img img-cover">
          <img src={metadata?.image} alt="" />
        </div>
        <div className="info">
          <div>
            <small>
              <span style={{ paddingRight: 4 }}>Price</span>
              <span className="color-yellowGreen">{metadata?.price} AFT</span>
            </small>
            <h6> {metadata?.title || ''} </h6>
          </div>
          <div className="btm-inf">
            <p>
              <small style={{ height: 42, textOverflow: 'ellipsis', overflow: 'hidden' }}>
                {metadata?.description}
              </small>
            </p>
          </div>
            <div>{!!actionButton && <>{actionButton(album)}</>}</div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
