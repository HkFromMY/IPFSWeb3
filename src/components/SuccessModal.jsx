import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
export default function SuccessModal({ showModal, setShowModal, CID, mode }) {
    let message;
    if (mode === 'delete') {
        message = `You have deleted the selected content`;
    } else if (mode === 'edit' || mode === 'upload') {
        message = `Your new CID for the content is`;
    }

    return (
        <Modal centered show={showModal} onHide={() => setShowModal(false)} size="lg">
            <Modal.Header closeButton>
                Successful { mode }
            </Modal.Header>
            <Modal.Body>
                <p>{ message } {(mode !== 'delete' && <strong>{ CID }</strong>)}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}