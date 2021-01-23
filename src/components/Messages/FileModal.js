import React, {useState, useEffect } from 'react';
import { Modal, Input, Button, Icon} from 'semantic-ui-react';
import mime from 'mime-types';


const FileModal = ({modal, closeModal, upLoadFile}) => {

  const [file, setFile] = useState(null);
  const [authorised, setAuthorised] = useState(['image/jpeg', 'image/png']);

  const addFile = () => {
      
        // eslint-disable-next-line no-restricted-globals
        const file = event.target.files[0];
     
        console.log(file, "the file being set")
        if(file) {
            setFile(file);
        }
  }

  const sendFile = () => {
      console.log(file, "the file");
      if(file !== null) {
          if(isAuthorised(file.name)) {
                const metaData = { contentType: mime.lookup(file.name)}
                upLoadFile(file, metaData);
                closeModal();
                setFile(null);
          }
      }
  }

  useEffect(()=> {

  }, [file])

  const isAuthorised = (fileName) => authorised.includes(mime.lookup(fileName));



    return (
     <Modal basic open={modal} onClose={closeModal}>
         <Modal.Content>
             <Input onChange={addFile} fluid label="File Upload" name="file" type="file" />
         </Modal.Content>
        <Modal.Actions>
            <Button onClick={sendFile} color="green" inverted>
                <Icon name="checkmark" />  Send
            </Button>
            <Button color="red" inverted onClick={closeModal}>
                <Icon name="remove" />  Cancel
            </Button>
        </Modal.Actions>
     </Modal>
   
    )
  
    }

export default FileModal;
