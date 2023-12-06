import { useSongMetadata } from '@/hooks/useSongMetadata';
import { Song } from '@/lib/redux';

type Props = {
  song: Song;
  onRemove: (song: Song) => void;
};

const SongRow = ({ song, onRemove }: Props) => {
  const metadata = useSongMetadata(song);

  return (
    <tr>
      <td scope="row">{metadata?.title || ''}</td>
      <td>
        <img
          src={metadata?.image || ''}
          alt=""
          style={{
            width: '60px',
            height: '60px',
          }}
        />
      </td>
      <td>
        <audio controls>
          <source src={metadata?.sound || ''} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </td>
      <td>{song.maxsupply}</td>
      <td>{metadata?.price || ''}</td>
      <td>09:35 11/02/2023</td>
      <td>
        <button
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          onClick={() => onRemove(song)}
          disabled={false}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default SongRow;