import React from 'react';
import './Styles/Home.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigateTo = useNavigate();
    return (
        <main className="home-page">
            <h1 className="home--title">Welcome to the IPFS powered website</h1>
            <p className="home--description">This website is built to upload and store all the files on the IPFS network which is based on the blockchain technology.</p>
            <Button className="home--button" onClick={() => navigateTo("/write")} >Get started</Button>
        </main>
    );
}