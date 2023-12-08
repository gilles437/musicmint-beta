import { Song } from "@/lib/redux";
import SongRow from "./SongRow";

type Props = {
  songs: Song[];
  actions?: (song: Song) => React.ReactElement;
}

const SongTable = ({ songs, actions }: Props) => {
  return (
    <div className="mt-5 table-responsive">
      <table className="table table-hover table-success table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Title</th>
            <th scope="col"></th>
            <th scope="col"></th>
            <th scope="col">MaxSupply</th>
            <th scope="col">Price</th>
            <th scope="col">Created On</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {(songs || []).map(
            (song: Song, index: number) => (
              <SongRow key={index} song={song} actions={actions} />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SongTable;
