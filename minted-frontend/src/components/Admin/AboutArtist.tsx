import Image from 'next/image';
import { useArtistMetadata } from '@/hooks/useArtistMetadata';
import Link from 'next/link';

type Props = {
  address: string;
};

const AboutArtist = ({ address }: Props) => {
  const { data: metadata } = useArtistMetadata(address);

  return (
    <div className="row my-5">
      <div className="col-md-3 col-sm-12">
        <div>
          {!!metadata?.image && (
            <img className="w-100 rounded-circle" src={metadata?.image} alt="" />
          )}
        </div>
      </div>
      <div className="col-md-9 col-sm-12">
        <div className="d-flex justify-content-between">
          <div>
            <h2>{metadata?.name || ''}</h2>
          </div>
          <div>
            {!!metadata?.twitter && (
              <Link
                className="pe-3"
                href={`https://twitter.com/${metadata?.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="twitter"
                  src="/assets/image/icon/twitter-logo.svg"
                  style={{ width: '32px', height: '32px' }}
                ></img>
              </Link>
            )}
            {!!metadata?.instagram && (
              <Link
                className="pe-3"
                href={`https://instagram.com/${metadata?.instagram}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="twitter"
                  src="/assets/image/icon/insta-1.svg"
                  style={{ width: '32px', height: '32px' }}
                ></img>
              </Link>
            )}
            {!!metadata?.youtube && (
              <Link
                className="pe-3"
                href={`https://youtube.com/${metadata?.youtube}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  alt="twitter"
                  src="/assets/image/icon/youtube.svg"
                  style={{ width: '32px', height: '32px' }}
                ></img>
              </Link>
            )}
          </div>
        </div>
        <div className="mt-3">
          <p>{metadata?.description || ''}</p>
        </div>
        <div className="mt-3">
          <Link href={`/profile?address=${address}`}>
            <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
              Go to Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutArtist;
