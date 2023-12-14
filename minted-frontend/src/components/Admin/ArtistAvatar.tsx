import Image from 'next/image';
import { Artist } from '@/lib/redux';
import features from '@/data/NFTMarketplace/features.json';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';

type Props = {
  artist: Artist;
};

// TODO - you have to change it to artist profile image.
const imageUrl = () => {
  const index = Math.floor(Math.random() * 100) % features.length;
  return features[index].image;
};

const ArtistAvatar = ({ artist }: Props) => {
  const metadata = useArtistMetadata(artist.to);

  return (
    <div className="col-lg-3 col-sm-6">
      <a href="#" className="feature-card">
        <div className="img icon-65 rounded-circle overflow-hidden img-cover me-3">
          <Image
            src={metadata?.image || imageUrl()}
            alt="Album"
            width={60}
            height={60}
            style={{ borderRadius: '16px' }}
          />
        </div>
        <div className="info">
          <h5> {metadata?.name || 'Artist'}  </h5>
          <p
            style={{
              width: '132px',
              height: '36px',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              fontSize: '12px',
            }}
          >
            {metadata?.description || '...'}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ArtistAvatar;
