import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  Album,
  AlbumMetadata,
  selectAlbumMetadata,
  setAlbumMetadata,
  useDispatch,
  useSelector,
} from '@/lib/redux'

const fetchAlbumMetadata = (url: string) => {
  const request = {
    method: 'GET',
    url,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }
  return axios(request)
    .then(({ data }: { data: AlbumMetadata }) => {
      return data
    })
    .catch((e) => {
      console.error(e)
      return null
    })
}

export const useAlbumMetadata = (album?: Album | null) => {
  const dispatch = useDispatch()
  const albumMetadata = useSelector(selectAlbumMetadata)

  const metadata = useMemo(() => {
    if (album?.id) {
      if (albumMetadata && albumMetadata[album.id]) {
        return albumMetadata[album.id]
      }
    }
    return null
  }, [albumMetadata, album])

  useEffect(() => {
    if (album && album.uri && !metadata) {
      fetchAlbumMetadata(album.uri).then((meta) => {
        meta && dispatch(setAlbumMetadata({ ...meta, id: album.id }))
      })
    }
  }, [album, metadata])

  return metadata
}
