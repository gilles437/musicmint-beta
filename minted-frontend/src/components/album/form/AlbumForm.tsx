import React, { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, selectAlbums } from '@/lib/redux'
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata'

export type CreateAlbumInput = {
  title: string
  description: string
  image: File
  maxSupply: number
  price: string
}

type Props = {
  albumId?: string
  onSubmit: (input: CreateAlbumInput) => Promise<boolean>
}

const CreateAlbumForm = ({ albumId, onSubmit }: Props) => {
  const albums = useSelector(selectAlbums)

  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [maxSupply, setMaxSupply] = useState<number>(0)
  const [price, setPrice] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<File>()
  const [selectedImageFileCid, setSelectedImageFileCid] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const selectedAlbum = useMemo(() => {
    if (albumId) {
      return (albums || []).find((i) => i.id === albumId)
    }
    return null
  }, [albums, albumId])

  const metadata = useAlbumMetadata(selectedAlbum)

  useEffect(() => {
    if (selectedAlbum && metadata) {
      setTitle(metadata.title)
      setDescription(metadata.description)
      setPrice(metadata.price)
      setMaxSupply(selectedAlbum.maxsupply)
    }
  }, [selectedAlbum, metadata])

  const handleImageChange = (e: any) => {
    e.preventDefault()
    setSelectedImage(e.target.files[0])
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!validateFields()) {
      return
    }

    const input = {
      title,
      description,
      image: selectedImage,
      maxSupply,
      price,
    } as CreateAlbumInput

    onSubmit(input).then((success) => {
      success && emptyFields()
    })
  }

  const emptyFields = () => {
    setDescription('')
    setTitle('')
    setSelectedImage(undefined)
  }

  const validateFields = () => {
    if (!title) {
      toastFunction('Please provide a title')
      return false
    }
    if (!description) {
      toastFunction('Please provide a description')
      return false
    }
    if (!price) {
      toastFunction('Please provide a price')
      return false
    }
    if (!selectedImage) {
      toastFunction('Please provide an image')
      return false
    }
    return true
  }

  const toastFunction = (string: any) => {
    toast.info(string, { position: toast.POSITION.TOP_RIGHT })
  }

  return (
    <div>
      <div className="text-center mb-3">
        <h2>{albumId ? 'Edit Album' : 'Create Album'}</h2>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="mt-3">
            <h5>Title</h5>
            <input
              type="text"
              placeholder="Enter Title..."
              style={{ width: '70%', height: '100%' }}
              value={title ? title : ''}
              onChange={(e: any) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h5>Description</h5>
            <textarea
              cols={30}
              rows={3}
              value={description ? description : ''}
              onChange={(e: any) => setDescription(e.target.value)}
              style={{ width: '70%', height: '100%' }}
            />
          </div>
          <div className="mt-3">
            <h5 className="">Image</h5>
            <input
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className="mt-3">
            <h5>Max Supply</h5>
            <input
              type="number"
              min={1}
              placeholder="Enter Max Supply..."
              value={maxSupply ? maxSupply : ''}
              onChange={(e: any) => setMaxSupply(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <h5>Price</h5>
            <input
              type="text"
              placeholder="Enter Price..."
              value={price ? price : ''}
              onChange={(e: any) => setPrice(e.target.value)}
            />
            <span className="ms-3">AFT</span>
          </div>
        </div>
        <div className="col-md-6 col-sm-12">
          {!!metadata && (
            <div>
              <img src={metadata.image || '/images/album.png'}></img>
            </div>
          )}
        </div>
      </div>

      <div className="text-center mt-5">
        <button
          className="btn rounded-3 color-000 fw-bold border-1 border brd-light bg-yellowGreen"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {albumId ? 'Update' : 'Create'} Album
        </button>
      </div>
    </div>
  )
}

export default CreateAlbumForm
