import { Album } from '@/lib/redux';
import AlbumRow from './AlbumRow';
import Loader from '../Loader';

type Props = {
  albums: Album[];
  loading?: boolean;
  showOwner?: boolean;
  showStats?: boolean;
  clickable?: boolean;
  actions?: (album: Album) => React.ReactElement;
};

const AlbumTable = ({ albums, loading, showOwner, showStats, clickable, actions }: Props) => {
  if (loading) {
    return <Loader size={40} />;
  }

  return (
    <div className="mt-5 table-responsive">
      <table className="table table-hover table-success table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col"></th>
            {!!showOwner && <th scope="col">Owner</th>}
            <th scope="col">Max Supply</th>
            <th scope="col">Price</th>
            {!!showStats && <th scope="col">Sold</th>}
            {!!showStats && <th scope="col">Gains</th>}
            <th scope="col">Created On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(albums || []).map((album: Album, index: number) => (
            <AlbumRow
              key={index}
              album={album}
              clickable={clickable}
              showOwner={showOwner}
              showStats={showStats}
              actions={actions}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumTable;
