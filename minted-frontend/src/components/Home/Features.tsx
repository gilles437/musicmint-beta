import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay } from 'swiper';

import {
  useSelector,
  useDispatch,
  fetchOwnedAlbumListAsync,
  fetchArtistListAsync,
  selectArtists,
} from '@/lib/redux';

import 'swiper/css';
import 'swiper/css/autoplay';
import ArtistAvatar from '../Admin/ArtistAvatar';

SwiperCore.use([Autoplay]);

const Features = () => {
  const [load, setLoad] = useState(false);
  // const [position] = useState({ from: 2150, to: 2500 });
  const dispatch = useDispatch();
  const artists = useSelector(selectArtists);

  const fetchAlbumList = useCallback(
    (owner: string) => {
      dispatch(fetchOwnedAlbumListAsync(owner));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchArtistListAsync());
  }, [dispatch, fetchAlbumList]);

  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <section className="features pt-100 style-12">
      <div className="container">
        <div className="section-head text-center mb-40 style-12">
          <h6 className="justify-content-center mb-3">
            <img src="/assets/img/icons/star2.png" alt="" className="icon" />
            <span className="mx-2"> featured </span>
            <img src="/assets/img/icons/star2.png" alt="" className="icon" />
          </h6>
          <h2>
            {' '}
            Best <span> Sellers </span>{' '}
          </h2>
        </div>
        <div className="content">
          <div className="row justify-content-center">
            {(artists || []).map((artist, index) => (
              <ArtistAvatar artist={artist} key={index} />
            ))}
          </div>
        </div>
      </div>
      <div className="features-line-slider12">
        {load && (
          <Swiper
            className="swiper-container"
            spaceBetween={0}
            centeredSlides={true}
            speed={10000}
            autoplay={{
              delay: 1,
            }}
            loop={true}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              480: {
                slidesPerView: 1,
              },
              787: {
                slidesPerView: 1,
              },
              991: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 2,
              },
            }}
          >
            <SwiperSlide className="swiper-slide">
              <a href="#">
                {' '}
                <img src="/assets/img/icons/star3.png" alt="" /> <h2> Sell your nft </h2>{' '}
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="#">
                {' '}
                <img src="/assets/img/icons/star3.png" alt="" /> <h2> be an portfolio author </h2>{' '}
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="#">
                {' '}
                <img src="/assets/img/icons/star3.png" alt="" /> <h2> nft’s great </h2>{' '}
              </a>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide">
              <a href="#">
                {' '}
                <img src="/assets/img/icons/star3.png" alt="" /> <h2> Sell your nft </h2>{' '}
              </a>
            </SwiperSlide>
          </Swiper>
        )}
        <img src="/assets/img/icons/features/27.png" alt="" className="icon slide_up_down" />
      </div>
    </section>
  );
};

export default Features;
