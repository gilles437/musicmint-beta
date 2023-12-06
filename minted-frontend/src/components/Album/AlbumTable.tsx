import { Album } from '@/lib/redux';
import AlbumRow from './AlbumRow';

type Props = {
  albums: Album[];
};

const AlbumTable = ({ albums }: Props) => {
  return (
    <div className="mt-5 table-responsive">
      <table className="table table-hover table-success table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Address</th>
            <th scope="col"></th>
            <th scope="col">Price</th>
            <th scope="col">Created On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(albums || []).map((album: Album, index: number) => (
            <AlbumRow key={index} album={album} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AlbumTable;
