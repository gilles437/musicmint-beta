import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import { Album, AlbumMetadata } from '@/lib/redux';
import LoadingButton from '@/components/LoadingButton';

export type CreateAlbumInput = {
  title: string;
  description: string;
  image?: File | null;
  maxSupply: number;
  price: string;
};

type Props = {
  album?: Album;
  metadata?: AlbumMetadata | null;
  onSubmit: (input: CreateAlbumInput) => Promise<boolean>;
};

const AlbumForm = ({ album, metadata, onSubmit }: Props) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [maxSupply, setMaxSupply] = useState<number>(0);
  const [price, setPrice] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<File>();
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (album && metadata) {
      setTitle(metadata.title);
      setDescription(metadata.description);
      setPrice(metadata.price);
      setMaxSupply(album.maxsupply);
    }
  }, [album, metadata]);

  const handleImageChange = (e: any) => {
    e.preventDefault();
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = (e: any) => {
    const form = e.currentTarget;
    console.log('handleSubmit', form);
    if (form.checkValidity() === false) {
      console.log('handleSubmit--error');
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    console.log('handleSubmit--validated');
    setValidated(true);

    if (!validateFields()) {
      return;
    }

    const input = {
      title,
      description,
      image: selectedImage,
      maxSupply,
      price,
    } as CreateAlbumInput;

    setIsLoading(true);

    onSubmit(input).then((success) => {
      success && emptyFields();
      setIsLoading(false);
    });
  };

  const emptyFields = () => {
    setDescription('');
    setTitle('');
    setSelectedImage(undefined);
  };

  const validateFields = () => {
    if (!title) {
      toast.warn('Please provide a title');
      return false;
    }
    if (!description) {
      toast.warn('Please provide a description');
      return false;
    }
    if (!price) {
      toast.warn('Please provide a price');
      return false;
    }
    if (!selectedImage) {
      toast.warn('Please provide an image');
      return false;
    }
    return true;
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <div className="text-center mb-3 pb-3">
        <h2>{album ? 'Edit Album' : 'Create Album'}</h2>
      </div>
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <Form.Group className="mt-3" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Album Title"
              value={title || ''}
              onChange={(e: any) => setTitle(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">Title is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              cols={30}
              placeholder="Description"
              value={description || ''}
              onChange={(e: any) => setDescription(e.target.value)}
            />
            <Form.Control.Feedback>Description is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              onChange={handleImageChange}
            />
            <Form.Control.Feedback>Image is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3" controlId="maxSupply">
            <Form.Label>Max Supply</Form.Label>
            <Form.Control
              required
              as="input"
              type="number"
              min={1}
              placeholder="Max Supply"
              value={maxSupply || ''}
              onChange={(e: any) => setMaxSupply(Number(e.target.value))}
            />
            <Form.Control.Feedback>Max Supply is required</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mt-3" controlId="price">
            <Form.Label>Price (AFT)</Form.Label>
            <Form.Control
              required
              as="input"
              type="number"
              min={1}
              value={price || ''}
              placeholder="Album Price"
              onChange={(e: any) => setPrice(e.target.value)}
            />
            <Form.Control.Feedback>Price is required</Form.Control.Feedback>
          </Form.Group>
        </div>
        <div className="col-md-6 col-sm-12">
          {!!metadata && (
            <div>
              <Image
                src={metadata.image || '/images/album.png'}
                alt="Album"
                width={420}
                height={420}
              />
            </div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 col-sm-12">
          <div className="text-end mt-5">
            <LoadingButton loading={isLoading} type="submit">
              <span>{album ? 'Update' : 'Create'} Album</span>
            </LoadingButton>
          </div>
        </div>
      </div>
    </Form>
  );
};

export default AlbumForm;
