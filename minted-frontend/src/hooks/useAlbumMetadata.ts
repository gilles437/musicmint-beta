import { useEffect, useState } from 'react'
import axios from 'axios'
import { AlbumMetadata } from '@/lib/redux'

export const useAlbumMetadata = (url?: string) => {
  const [metadata, setMetadata] = useState<AlbumMetadata | null>(null)

  useEffect(() => {
    if (url) {
      const request = {
        method: 'GET',
        url,
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
      axios(request)
        .then(({ data }: { data: AlbumMetadata }) => {
          setMetadata(data)
        })
        .catch(console.error)
    }
  }, [url])

  return metadata
}
