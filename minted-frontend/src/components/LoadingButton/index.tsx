import React from 'react';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

interface Props extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({ loading, children, ...props }: Props) => {
  return (
    <Button variant="primary" disabled={!!loading} style={{ alignItems: 'center' }} {...props}>
      {children}
      {!!loading && (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
          style={{ marginLeft: '8px' }}
        />
      )}
    </Button>
  );
};

export default LoadingButton;
