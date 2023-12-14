import Image from 'next/image';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';

type Props = {
  album: Album;
};

const AlbumItem = ({ album }: Props) => {
  const metadata = useAlbumMetadata(album);

  return (
    <div className="col-lg-3 col-sm-6">
        <a href="#" className="feature-card">
        <div className="img icon-65 rounded-circle overflow-hidden img-cover me-3">
            <Image
                src={metadata?.image || '/images/album.png'}
                alt="Album"
                width={60}
                height={60}
                style={{ borderRadius: '16px' }}
            />
        </div>
        <div className="info">
            <h5> {metadata?.title || ''} </h5>
            <p>
            Price:
            <span className="color-yellowGreen ms-1"> {metadata?.price || ''} </span>
            {/* <CountTo className="counter color-yellowGreen" from={0} to={feature.rise} speed={1500} position={position} /> */}
            </p>
        </div>
        </a>
    </div>
  );
};

export default AlbumItem;
