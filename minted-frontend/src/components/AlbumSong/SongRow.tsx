import dayjs from 'dayjs';
import { useSongMetadata } from '@/hooks/useSongMetadata';
import { Song } from '@/lib/redux';

type Props = {
  song: Song;
  actions?: (song: Song) => React.ReactElement;
};

const SongRow = ({ song, actions }: Props) => {
  const metadata = useSongMetadata(song);

  return (
    <tr>
      <td scope="row">{metadata?.title || ''}</td>
      <td>
        <img
          src={metadata?.image || ''}
          alt="Song"
          style={{ width: '60px', height: '60px' }}
        />
      </td>
      <td>
        <audio controls>
          {!!metadata?.sound && <source src={metadata.sound} type="audio/mpeg" />}
          Your browser does not support the audio element.
        </audio>
      </td>
      <td>{song.maxsupply}</td>
      <td>{metadata?.price || ''}</td>
      <td>{dayjs(song.timestamp).format('MM/DD/YYYY HH:mm')}</td>
      <td>{actions ? actions(song) : ''}</td>
      {/* <td>
        <button
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          onClick={() => onRemove(song)}
          disabled={false}
        >
          Remove
        </button>
      </td> */}
    </tr>
  );
};

export default SongRow;
