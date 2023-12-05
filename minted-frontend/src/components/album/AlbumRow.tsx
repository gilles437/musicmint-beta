import { useState, useEffect } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Album, AlbumMetadata } from "@/lib/redux";

type Props = {
  album: Album;
};

const AlbumRow = ({ album }: Props) => {
  const [metadata, setMetadata] = useState<AlbumMetadata | null>(null);

  useEffect(() => {
    const request = {
      method: "GET",
      url: album.uri,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    axios(request)
      .then(({ data }: { data: AlbumMetadata}) => {
        setMetadata(data);
      })
      .catch(console.error);
  }, [album]);

  return (
    <tr>
      <td scope="row">{metadata?.title || ""}</td>
      <td>
        <img
          src={metadata?.image || "/images/album.png"}
          alt="Album"
          style={{ width: "60px", height: "60px", borderRadius: '16px' }}
        />
      </td>
      <td>{metadata?.price || ""}</td>
      <td>{dayjs(album.timestamp).format("MM/DD/YYYY HH:mm")}</td>
      <td>
        <Link href={`/album/edit?id=${album.id}`}>
          <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default AlbumRow;
