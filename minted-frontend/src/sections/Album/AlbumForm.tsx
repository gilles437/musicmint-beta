import Image from 'next/image';
import React, { useEffect, useState, useMemo } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { Album } from '@/lib/redux';
import LoadingButton from '@/components/LoadingButton';
import { useAlbumMetadata } from '@/hooks/useAlbumMetadata';

export type CreateAlbumInput = {
  title: string;
  description: string;
  file: File | null;
  maxSupply: number;
  price: string;
};

type Props = {
  album?: Album;
  onSubmit: (input: CreateAlbumInput) => Promise<boolean>;
};

const AlbumForm = ({ album, onSubmit }: Props) => {
  const metadata = useAlbumMetadata(album);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      onSubmit(values).then((success) => {
        success && emptyFields();
        setIsLoading(false);
      });
    },
  });

  useEffect(() => {
    if (album && metadata) {
      formik.setFieldValue('title', metadata.title);
      formik.setFieldValue('description', metadata.description);
      formik.setFieldValue('file', metadata.image);
      formik.setFieldValue('maxSupply', album.maxsupply);
      formik.setFieldValue('price', metadata.price);
    }
  }, [album, metadata]);

  const emptyFields = () => {};

  const isModified = useMemo(() => {
    if (album && metadata) {
      return (
        metadata.title !== formik.values.title ||
        metadata.description !== formik.values.description ||
        metadata.price !== formik.values.price ||
        metadata.image != formik.values.file
      );
    }
    return true;
  }, [formik, metadata]);

  const profileImage = useMemo(() => {
    if (formik.values.file && typeof formik.values.file !== 'string') {
      return URL.createObjectURL(formik.values.file);
    }
    return metadata?.image;
  }, [formik, metadata?.image]);

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className="text-center mb-3 pb-3">
        <h2>{album ? 'Edit Album' : 'Create Album'}</h2>
      </div>
      <Row className="mt-3">
        <Col xs="12" sm="6">
          <Row>
            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                placeholder="Album Title"
                disabled={isLoading}
                isInvalid={!!(formik.touched.title && formik.errors.title)}
                value={formik.values.title}
                onChange={formik.handleChange}
              />
              {!!formik.touched.title && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.title}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                cols={30}
                disabled={isLoading}
                placeholder="Description"
                isInvalid={!!(formik.touched.description && formik.errors.description)}
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {!!formik.touched.description && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.description}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                disabled={isLoading}
                isInvalid={!!(formik.touched.file && formik.errors.file)}
                onChange={(e: any) => formik.setFieldValue('file', e.target.files[0])}
              />
              {!!formik.touched.file && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.file}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="maxSupply">
              <Form.Label>Max Supply</Form.Label>
              <Form.Control
                as="input"
                type="number"
                min={1}
                placeholder="Max Supply"
                disabled={isLoading}
                isInvalid={!!(formik.touched.maxSupply && formik.errors.maxSupply)}
                value={formik.values.maxSupply}
                onChange={formik.handleChange}
              />
              {!!formik.touched.maxSupply && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.maxSupply}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="price">
              <Form.Label>Price (AFT)</Form.Label>
              <Form.Control
                as="input"
                type="number"
                min={1}
                placeholder="Album Price"
                disabled={isLoading}
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
          </Row>
        </Col>
        <Col xs="12" sm="6">
          {!!metadata && (
            <div className="text-center" style={{ marginTop: 45 }}>
              <Image
                src={profileImage || '/images/album.png'}
                alt="Album"
                width={420}
                height={420}
              />
            </div>
          )}
        </Col>
      </Row>

      <Row>
        <Col xs="12" sm="6">
          <div className="text-end mt-5">
            <LoadingButton
              loading={isLoading}
              type="submit"
              className="color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              disabled={!isModified}
            >
              <span>{album ? 'Update' : 'Create'} Album</span>
            </LoadingButton>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

const initialValues = {
  title: '',
  description: '',
  file: null,
  maxSupply: 0,
  price: '',
};

const validationSchema = yup.object().shape({
  title: yup.string().required('Title required'),
  description: yup.string().required('Description required'),
  file: yup.mixed().required('Image required'),
  maxSupply: yup.number().required('Max Supply required'),
  price: yup.string().required('Price required'),
});

export default AlbumForm;
