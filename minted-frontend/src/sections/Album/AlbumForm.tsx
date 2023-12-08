import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import * as yup from 'yup';
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
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: null,
      maxSupply: 0,
      price: '',
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (album && metadata) {
      formik.setFieldValue('title', metadata.title);
      formik.setFieldValue('description', metadata.description);
      formik.setFieldValue('maxSupply', album.maxsupply);
      formik.setFieldValue('price', metadata.price);
    }
  }, [formik, album, metadata]);

  const handleSubmit = (values: CreateAlbumInput) => {
    setIsLoading(true);

    onSubmit(values).then((success) => {
      success && emptyFields();
      setIsLoading(false);
    });
  };

  const emptyFields = () => {};

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className="text-center mb-3 pb-3">
        <h2>{album ? 'Edit Album' : 'Create Album'}</h2>
      </div>
      <Row className="mt-3">
        <div className="col-md-6 col-sm-12">
          <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              placeholder="Album Title"
              isInvalid={!!(formik.touched.title && formik.errors.title)}
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.title}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={3}
              cols={30}
              placeholder="Description"
              isInvalid={!!(formik.touched.description && formik.errors.description)}
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              required
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              isInvalid={!!(formik.touched.image && formik.errors.image)}
              onChange={(e: any) => formik.setFieldValue('image', e.target.files[0])}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.image}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="maxSupply">
            <Form.Label>Max Supply</Form.Label>
            <Form.Control
              required
              as="input"
              type="number"
              min={1}
              placeholder="Max Supply"
              isInvalid={!!(formik.touched.maxSupply && formik.errors.maxSupply)}
              value={formik.values.maxSupply}
              onChange={formik.handleChange}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.maxSupply}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="price">
            <Form.Label>Price (AFT)</Form.Label>
            <Form.Control
              required
              as="input"
              type="number"
              min={1}
              placeholder="Album Price"
              isInvalid={!!(formik.touched.price && formik.errors.price)}
              value={formik.values.price}
              onChange={formik.handleChange}
            />
            {!!formik.touched.price && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.price}
              </Form.Control.Feedback>
            )}
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
      </Row>

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

const formSchema = yup.object().shape({
  title: yup.string().required('Title required'),
  description: yup.string().required('Description required'),
  image: yup.mixed().required('Image required'),
  maxSupply: yup.number().required('Max Supply required'),
  price: yup.string().required('Price required'),
});

export default AlbumForm;
