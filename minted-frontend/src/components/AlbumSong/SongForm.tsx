import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '../LoadingButton';

export type CreateSongInput = {
  title: string;
  price: string;
  maxSupply: number;
  image: File;
  sound: File;
};

type Props = {
  onSubmit: (input: CreateSongInput) => Promise<boolean>;
};

const SongForm = ({ onSubmit }: Props) => {
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit: (values: any) => {
      setIsLoading(true);
      onSubmit(values).then((success) => {
        success && emptySoundFields();
        setIsLoading(false);
      });
    },
  });

  const emptySoundFields = () => {};

  return (
    <div className="mt-3" style={{ borderTop: '1px solid' }}>
      <div className="text-center mb-3 pb-3">
        <h2 className="mt-3">Add Song</h2>
      </div>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Row>
          <Form.Group as={Col} xs="12" sm="6" className="position-relative" controlId="title">
            <Form.Label className="mt-3">Title</Form.Label>
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
                {formik.errors.title as string}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="6" className="position-relative" controlId="price">
            <Form.Label className="mt-3">Price (AFT)</Form.Label>
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
                {formik.errors.price as string}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="6" className="position-relative" controlId="sound">
            <Form.Label className="mt-3">Soundtrack</Form.Label>
            <Form.Control
              type="file"
              accept=".mp3, .mp4, .wav|audio/*,video/*"
              disabled={isLoading}
              isInvalid={!!(formik.touched.sound && formik.errors.sound)}
              onChange={(e: any) => formik.setFieldValue('sound', e.target.files[0])}
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {formik.errors.sound as string}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="6" className="position-relative" controlId="image">
            <Form.Label className="mt-3">Image</Form.Label>
            <Form.Control
              type="file"
              accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
              disabled={isLoading}
              isInvalid={!!(formik.touched.image && formik.errors.image)}
              onChange={(e: any) => formik.setFieldValue('image', e.target.files[0])}
            />
            {!!formik.touched.image && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.image as string}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Form.Group as={Col} xs="12" sm="6" className="position-relative" controlId="maxSupply">
            <Form.Label className="mt-3">Max Supply</Form.Label>
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
                {formik.errors.maxSupply as string}
              </Form.Control.Feedback>
            )}
          </Form.Group>

          <Col xs="12" sm="6">
            <div className="text-end mt-5">
              <LoadingButton
                loading={isLoading}
                type="submit"
                className="color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              >
                <span>Add Song</span>
              </LoadingButton>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

const initialValues = {
  title: '',
  sound: null,
  image: null,
  maxSupply: '',
  price: '',
};

const formSchema = yup.object().shape({
  title: yup.string().required('Title required'),
  sound: yup.mixed().required('Sound track required'),
  image: yup.mixed().required('Image required'),
  maxSupply: yup.number().required('Max Supply required'),
  price: yup.string().required('Price required'),
});

export default SongForm;
