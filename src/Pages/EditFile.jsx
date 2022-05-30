// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import SuccessModal from '../components/SuccessModal';

// export default function EditFile() {
//     const [toggleEdit, setToggleEdit] = React.useState(false);
//     const [receipient, setReceipient] = React.useState({
//         name: "",
//         email: "",
//         phone: ""
//     });
//     const [CID, setCID] = React.useState("");
//     const [newCID, setNewCID] = React.useState("");
//     const [fileUploaded, setFileUploaded] = React.useState("");
//     const [showSuccessModal, setShowSuccessModal] = React.useState(false);

//     function editFile(event) {
//         event.preventDefault();
//         // delete file and upload a new file
//     }

//     function changeReceipient(event) {
//         let { name, value } = event.target;
//         setReceipient(oldReceipient => {
//             return {
//                 ...oldReceipient,
//                 [name]: value
//             };
//         });
//     }

//     return (
//         <Container className="edit-file-container">
//             <h3 className="form-big-title">File form</h3>
//             <Form onSubmit={(event) => editFile(event)}>
//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="CID" className="form-title">CID:</Form.Label>
//                     <Form.Control type="text" name="CID" id="CID" value={CID} placeholder="Enter content's CID to be edited" onChange={(event) => setCID(event.target.value)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="name" className="form-title">Receipient Name:</Form.Label>
//                     <Form.Control type="text" name="name" id="name" value={receipient.name} onChange={(event) => changeReceipient(event)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="email" className="form-title">Receipient Email:</Form.Label>
//                     <Form.Control type="email" name="email" id="email" value={receipient.email} onChange={(event) => changeReceipient(event)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="phone" className="form-title">Receipient Phone Number:</Form.Label>
//                     <Form.Control type="text" name="phone" id="phone" value={receipient.phone} onChange={(event) => changeReceipient(event)} />
//                 </Form.Group>

//                 <Form.Group className="mb-3">
//                     <Form.Label htmlFor="file" className="form-title">Upload File:</Form.Label>
//                     <Form.Control 
//                         type="file"
//                         name="file"
//                         id="file"
//                         onChange={(event) => setFileUploaded(event.target.files[0])}
//                     />
//                 </Form.Group>

//                 <div className="send-button-container">
//                     <Button 
//                         type="submit" 
//                         className="send-message-button"
//                     >
//                         Send
//                     </Button>
//                 </div>
//             </Form>
//             <SuccessModal showModal={showSuccessModal} setShowModal={setShowSuccessModal} CID={CID} mode={'upload'} />
//         </Container>
//     );
// }