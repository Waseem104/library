import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmModal = ({ show, onClose, onConfirm, title, body }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-light border-bottom-0">
        <Modal.Title className="text-danger text-center fw-bold ">
          {title || "Confirm Action"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-5 text-dark text-center">
        {body || "Are you sure you want to proceed?"}
      </Modal.Body>
      <Modal.Footer className="justify-content-center border-top-0 pb-4">
        <Button variant="outline-secondary" onClick={onClose} className="px-4">
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm} className="px-4">
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
