import React from 'react';
import Link from 'next/link';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';

type Props = {
  album: Album;
};

const CollectionCard = ({ album }: Props) => {
  const albumInfo = useAlbumMetadata(album);
  const artistInfo = useArtistMetadata(album.from);

  return (
    <div className="collection-card">
      <Link
        href={`/album/detail?contract=${album.contract}&albumId=${album.albumid}`}
        className="project-card hover-shadow"
      >
        <div className="top-info">
          <h6> {albumInfo?.title || ''} </h6>
          <p>
            <img src="/assets/img/icons/star2.png" alt="" />
            <span className="text-white"> {12} </span>
            <span style={{ paddingLeft: 4 }}> Items </span>
          </p>
        </div>
        <div className="auther-img">
          <img src={artistInfo?.image || '/assets/img/user-1.jpg'} alt="" />
        </div>
        <div className="imgs">
          <div className="main-img img-cover">
            <img src={albumInfo?.image || ''} alt="" />
          </div>
          {/* <div className="sub-imgs">
          {subImages.map((img, idx) => (
            <img src={img} alt="" key={idx} />
          ))}
        </div> */}
        </div>
      </Link>
    </div>
  );
};

export default CollectionCard;
