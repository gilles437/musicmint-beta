import Link from 'next/link'
import dayjs from 'dayjs'
import { Album } from '@/lib/redux'
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata'

type Props = {
  album: Album
}

const AlbumRow = ({ album }: Props) => {
  const metadata = useAlbumMetadata(album)

  return (
    <tr>
      <td scope="row">{metadata?.title || ''}</td>
      <td>
        <img
          src={metadata?.image || '/images/album.png'}
          alt="Album"
          style={{ width: '60px', height: '60px', borderRadius: '16px' }}
        />
      </td>
      <td>{metadata?.price || ''}</td>
      <td>{dayjs(album.timestamp).format('MM/DD/YYYY HH:mm')}</td>
      <td>
        <Link href={`/album/edit?id=${album.id}`}>
          <button className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen">
            Edit
          </button>
        </Link>
      </td>
    </tr>
  )
}

export default AlbumRow
