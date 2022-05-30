import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function SuccessModal({ showModal, setShowModal }) {

    return (
        <Modal centered show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
                Something went wrong
            </Modal.Header>
            <Modal.Body>
                <p>Maybe you have typed the wrong CID?</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}