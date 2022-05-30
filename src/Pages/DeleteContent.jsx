import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import SuccessModal from '../components/SuccessModal';
import FailModal from '../components/FailModal';
import './Styles/DeleteContent.css';

export default function DeleteContent() {
    const [CID, setCID] = React.useState("");
    const [showSuccessModal, setShowSuccessModal] = React.useState(false);
    const [showFailModal, setShowFailModal] = React.useState(false);

    function onSubmit(event) {
        event.preventDefault();

        fetch(`https://api.pinata.cloud/pinning/unpin/${CID}`, {
            method: 'DELETE',
            headers: {
                pinata_api_key: process.env.REACT_APP_IPFS_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_IPFS_PRIVATE_KEY
            }
        })
        .then(res => {
            console.log(res);
            if (res.status === 200) {
                setShowSuccessModal(true);
            } else {
                setShowFailModal(true);
            }
        })
        .catch(err => {
            setShowFailModal(true);
            console.error(err);
        });
        
        setCID("");
    }
    return (
        <div className="delete-content-container">
            <h1 className="delete-content-title">Delete Content</h1>
            <Form className="delete-cid-form" onSubmit={(event) => onSubmit(event)}>
                <Form.Group>
                    <Form.Label htmlFor="CID">Enter your CID here:</Form.Label>
                    <Form.Control 
                        id="CID" 
                        type="text" 
                        value={CID} 
                        placeholder="Enter content's CID to be deleted" 
                        onChange={(event) => setCID(event.target.value)} 
                    />
                </Form.Group>

                <Button type="submit" variant="danger" className="mt-3 delete-button">Delete</Button>                
            </Form>

            <SuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} CID={''} mode={'delete'} />
            <FailModal showModal={showFailModal} setShowModal={setShowFailModal} />
        </div>
    );
}