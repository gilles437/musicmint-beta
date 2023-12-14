import Image from 'next/image';
import { Artist } from '@/lib/redux';
import features from '@/data/NFTMarketplace/features.json';

type Props = {
  artist: Artist;
};

// TODO - you have to change it to artist profile image.
const imageUrl = () => {
  const index = Math.floor(Math.random() * 100) % features.length;
  return features[index].image;
}

const ArtistAvatar = ({ artist }: Props) => {
  return (
    <div className="col-lg-3 col-sm-6">
      <a href="#" className="feature-card">
        <div className="img icon-65 rounded-circle overflow-hidden img-cover me-3">
          <Image
            src={imageUrl()}
            alt="Album"
            width={60}
            height={60}
            style={{ borderRadius: '16px' }}
          />
        </div>
        <div className="info">
          <h5> Artist </h5>
          <p>
            Price:
            <span className="color-yellowGreen ms-1"> 20 </span>
            {/* <CountTo className="counter color-yellowGreen" from={0} to={feature.rise} speed={1500} position={position} /> */}
          </p>
        </div>
      </a>
    </div>
  );
};

export default ArtistAvatar;
