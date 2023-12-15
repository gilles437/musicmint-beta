import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { beatifyAddress } from '@/utils/account';
import { useMemo } from 'react';

type Props = {
  album: Album;
  showOwner?: boolean;
  clickable?: boolean;
  actions?: (album: Album) => React.ReactElement;
};

const AlbumRow = ({ album, showOwner, clickable, actions }: Props) => {
  const router = useRouter();
  const metadata = useAlbumMetadata(album);

  const minted = useMemo(() => {
    if (router.query?.minted) {
      return router.query?.minted as string;
    }
    return null;
  }, [router.query?.minted]);

  const onClick = () => {
    router.push(`/album/detail?contract=${album.contract}&albumId=${album.albumid}&minted=${minted}`);
  };

  return (
    <tr style={{ cursor: 'pointer' }} onClick={clickable ? onClick : undefined}>
      <td scope="row">{metadata?.title || ''}</td>
      <td>
        <Image
          src={metadata?.image || '/images/album.png'}
          alt="Album"
          width={60}
          height={60}
          style={{ borderRadius: '16px' }}
        />
      </td>
      {!!showOwner && <td>{beatifyAddress(album.from)}</td>}
      <td>{album.maxsupply || ''}</td>
      <td>{metadata?.price || ''}</td>
      <td>{dayjs(album.timestamp).format('MM/DD/YYYY HH:mm')}</td>
      <td>{actions ? actions(album) : ''}</td>
    </tr>
  );
};

export default AlbumRow;
