import { Song } from "@/lib/redux";
import SongRow from "./SongRow";

type Props = {
  songs: Song[];
}

const SongTable = ({ songs }: Props) => {
  const onRemoveSong = async (song: Song) => {
    
  }

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
              <SongRow key={index} song={song} onRemove={onRemoveSong} />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default SongTable;
