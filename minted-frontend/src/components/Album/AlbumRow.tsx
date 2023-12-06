import dayjs from 'dayjs';
import Image from 'next/image';
import { Album } from '@/lib/redux';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';
import { beatifyAddress } from '@/utils/account';

type Props = {
  album: Album;
  showOwner?: boolean;
  actions?: (album: Album) => React.ReactElement;
};

const AlbumRow = ({ album, showOwner, actions }: Props) => {
  const metadata = useAlbumMetadata(album);

  return (
    <tr>
      <td scope="row">{metadata?.title || ''}</td>
      <td>
        <Image
          src={metadata?.image || '/images/album.png'}
          alt="Album"
          style={{ width: '60px', height: '60px', borderRadius: '16px' }}
        />
      </td>
      {!!showOwner && <td>{beatifyAddress(album.from)}</td>}
      <td>{metadata?.price || ''}</td>
      <td>{dayjs(album.timestamp).format('MM/DD/YYYY HH:mm')}</td>
      <td>{actions ? actions(album) : ''}</td>
    </tr>
  );
};

export default AlbumRow;
