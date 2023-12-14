import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LoadingButton from '@/components/LoadingButton';

export type Profile = {
  name: string;
  description: string;
  image?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
};

export type ProfileInput = {
  name: string;
  description: string;
  image?: File | null;
  twitter?: string;
  instagram?: string;
  youtube?: string;
};

type Props = {
  profile?: Profile;
  onSubmit: (input: ProfileInput) => Promise<boolean>;
};

const ProfileForm = ({ profile, onSubmit }: Props) => {
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
    if (profile && profile) {
      formik.setFieldValue('name', profile.name);
      formik.setFieldValue('description', profile.description);
      formik.setFieldValue('twitter', profile.twitter);
      formik.setFieldValue('instagram', profile.instagram);
      formik.setFieldValue('youtube', profile.youtube);
    }
  }, [profile, profile]);

  const emptyFields = () => {};

  return (
    <Form noValidate onSubmit={formik.handleSubmit}>
      <div className="text-center mb-3">
        <h2>Update Your Profile</h2>
      </div>
      <div className="mt-3">
        <Row>
          <Col xs="12" sm="3"></Col>
          <Col xs="12" sm="6">
            {!!profile?.image && (
              <div className="text-center" style={{ marginTop: 45 }}>
                <Image
                  style={{ borderRadius: 100 }}
                  src={profile.image || '/images/album.png'}
                  alt="Avatar"
                  width={210}
                  height={210}
                />
              </div>
            )}
              
            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="name">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Album Title"
                disabled={isLoading}
                isInvalid={!!(formik.touched.name && formik.errors.name)}
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {!!formik.touched.name && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.name}
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
                isInvalid={!!(formik.touched.image && formik.errors.image)}
                onChange={(e: any) => formik.setFieldValue('image', e.target.files[0])}
              />
              {!!formik.touched.image && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.image}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="twitter">
              <Form.Label>Twitter</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Twitter"
                disabled={isLoading}
                isInvalid={!!(formik.touched.twitter && formik.errors.twitter)}
                value={formik.values.twitter}
                onChange={formik.handleChange}
              />
              {!!formik.touched.twitter && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.twitter}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="instagram">
              <Form.Label>Instagram</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Instagram"
                disabled={isLoading}
                isInvalid={!!(formik.touched.instagram && formik.errors.instagram)}
                value={formik.values.instagram}
                onChange={formik.handleChange}
              />
              {!!formik.touched.instagram && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.instagram}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <Form.Group as={Col} md="12" className="mt-3 position-relative" controlId="youtube">
              <Form.Label>Youtube</Form.Label>
              <Form.Control
                as="input"
                type="text"
                placeholder="Youtube"
                disabled={isLoading}
                isInvalid={!!(formik.touched.youtube && formik.errors.youtube)}
                value={formik.values.youtube}
                onChange={formik.handleChange}
              />
              {!!formik.touched.youtube && (
                <Form.Control.Feedback type="invalid" tooltip>
                  {formik.errors.youtube}
                </Form.Control.Feedback>
              )}
            </Form.Group>

            <div className="text-center mt-5">
              <LoadingButton
                loading={isLoading}
                type="submit"
                className="color-000 fw-bold border-1 border brd-light bg-yellowGreen"
              >
                <span>{profile ? 'Update' : 'Create'} Album</span>
              </LoadingButton>
            </div>
          </Col>
          {/* <Col xs="6" sm="6">
            {!!profile && (
              <div className="text-center" style={{ marginTop: 45 }}>
                <Image
                  src={profile.imageUrl || '/images/album.png'}
                  alt="Avatar"
                  width={210}
                  height={210}
                />
              </div>
            )}
          </Col> */}
          <Col xs="12" sm="3"></Col>
        </Row>
      </div>
    </Form>
  );
};

const initialValues = {
  name: '',
  description: '',
  image: null,
  twitter: '',
  instagram: '',
  youtube: '',
};

const validationSchema = yup.object().shape({
  name: yup.string().required('Name required'),
  description: yup.string().required('Description required'),
  image: yup.mixed().required('Image required'),
});

export default ProfileForm;
