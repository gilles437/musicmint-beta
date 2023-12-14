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
      <Link href="/album/detail" className="project-card hover-shadow">
        <div className="top-inf">
          <span>
            <i className="fas fa-heart"></i> {200}
          </span>
          <span>
            <i className="fas fa-sort color-yellowGreen"></i>
            {1000}
          </span>
        </div>
        <div className="img img-cover">
          <img src={metadata?.image} alt="" />
          {/* <Link
            href="/album/detail"
            className="butn bg-yellowGreen rounded-3 hover-shadow"
          >
            <span className="text-dark">
              <i className="fal fa-shopping-basket me-1"></i> Buy
              Now
            </span>
          </Link> */}
        </div>
        <div className="info">
          <div className="row">
            <div className="col-6">
              <small>
                <span style={{ paddingRight: 4 }}>Highest bid</span>
                <span className="color-yellowGreen">{1000}</span>
              </small>
              <h6> {metadata?.title || ''} </h6>
            </div>
            <div className="col-6">
              {!!actionButton && <>{actionButton(album)}</>}
            </div>
          </div>
          <div className="btm-inf">
            <p>
              <i className="fal fa-users color-yellowGreen"></i>
              <span style={{ paddingLeft: 4 }}>500+ Place Bit</span>
            </p>
            <p>
              <i className="fal fa-history color-yellowGreen"></i>
              <span style={{ paddingLeft: 4 }}>History</span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AlbumCard;
