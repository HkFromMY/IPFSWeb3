### Inter Planetary File System (IPFS) powered Web 3.0 

This website is powered by IPFS which is based on the blockchain technology. The IPFS network is decentralized and implementing a peer-to-peer model for uploading and retrieving content stored on the network.

### Features of the website

1. Upload files and write message (packaged in JSON format)
2. Edit the content by Content Identifier (CID) generated. 
3. Delete content by CID.
4. Retrieve content stored on the network using CID.

### Why use IPFS for backend

The website itself is no different than any other Web 2.0 application at first glance but the backend of this system is completely different from the other Web 2.0 backend. As the backend is powered by IPFS, there are no centralized database where the administrator has full control over the data and files uploaded to the system so the privacy of the users is ensured. The security of the system is also guaranteed as the IPFS storage network is based on blockchain which is distributed so there are no centralized target for the invaders or hackers to attack for files. If they do, the reward for the successful attack will be far lower than the actual cost to attack the entire IPFS network as the invaders must gain access of control to the 51% of the users (nodes) of the network to actually modify the data itself.

### How to implement IPFS?

The IPFS network is accessed in the system via the API provided by the Pinata gateway which acts as a bridge between the traditional Web 2.0 and the IPFS network. By using the API provided, the developer is not required to install the local IPFS network themselves thus saving much more time to implement the IPFS network and put more time in the actual development of your application.

[Click me for the link of the documentation of the API](https://docs.pinata.cloud/api-pinning/pin-file)

### Disadvantages of using IPFS

1. The data and files uploaded cannot be deleted and editted.
2. The request rate is limited and performance can be slow if using public gateway instead of dedicated gateway which requires the developer to subscribe to the Pinata service.
3. The users of the system need to remember the CID generated when uploading the file to retrieve the same content again next time unless the CID is managed by a centralized database server.


