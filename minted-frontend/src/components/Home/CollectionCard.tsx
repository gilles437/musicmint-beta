import React from 'react';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import collectionsData from '@/data/NFTMarketplace/collections.json';

type Props = {
  album: Album;
};

const collection = collectionsData[0];
const subImages = collection.subImages;

const CollectionCard = ({ album }: Props) => {
  const metadata = useAlbumMetadata(album);

  return (
    <div className="collection-card">
      <div className="top-info">
        <h6> {metadata?.title || ''} </h6>
        <p>
          <img src="/assets/img/icons/star2.png" alt="" />
          <span className="text-white"> {12} </span>
          <span style={{ paddingLeft: 4 }}> Items </span>
        </p>
      </div>
      <div className="auther-img">
        <img src={collection.pic} alt="" />
      </div>
      <div className="imgs">
        <div className="main-img img-cover">
          <img src={metadata?.image || ''} alt="" />
        </div>
        {/* <div className="sub-imgs">
          {subImages.map((img, idx) => (
            <img src={img} alt="" key={idx} />
          ))}
        </div> */}
      </div>
    </div>
  );
};

export default CollectionCard;
