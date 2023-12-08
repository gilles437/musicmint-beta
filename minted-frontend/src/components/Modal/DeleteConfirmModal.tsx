import Button from 'react-bootstrap/Button';
import Modal, { ModalProps } from 'react-bootstrap/Modal';

interface Props extends ModalProps {
  title: string;
  description: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal = ({ title, description, onConfirm, onCancel, ...props }: Props) => {
  return (
    <Modal ssize="lg" aria-labelledby="contained-modal-title-vcenter" centered {...props}>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{description}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="warning" onClick={onConfirm}>Confirm</Button>
        <Button variant="light" onClick={onCancel}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmModal;
