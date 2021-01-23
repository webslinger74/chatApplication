import React, {useState, useEffect} from 'react';
import {Segment, Button, Input } from 'semantic-ui-react';
import  {useChannelContext} from '../../context/channel_context';
import { useUserContext } from '../../context/user_context';
import firebase from '../../firebase';
import FileModal from './FileModal';
import ProgressBar from './ProgressBar';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

const { uuid } = require('uuidv4');


const MessagesForm = () => {

    const [message, setMessage] = useState('');
    const [storageRef, setStorageRef] = useState(firebase.storage().ref());
    const [percentageUpLoaded, setPercentageUpLoaded] = useState(0);
    const [upLoadTask, setUpLoadTask] = useState(null);
    const [upLoadState, setUpLoadState] = useState('done');
    const { channel } = useChannelContext();
    const { user }  = useUserContext();
    const [messageRef, setMessageRef] = useState(firebase.database().ref('messages'));
    const [modal, setModal] = useState(false);
    const [emojiPicker, setEmojiPicker] = useState(false);

    const sendMessage = () => {
        if(message !== null && channel !== undefined) {
        messageRef.child(channel.id)
        .push()
        .set(createMessage(user.user))
        .then(()=> {
            setMessage('');
        })
        .catch(err => {
            console.log(err);
        })
    }
}

    const createMessage = (globalUser, fileUrl = null) => {
        const messageToSend = {
            timestamp:firebase.database.ServerValue.TIMESTAMP,
            user: {
               id:globalUser.uid,
               name:globalUser.displayName,
               avatar:globalUser.photoURL 
            }
        }
        if(fileUrl !== null) {
            messageToSend['image'] = fileUrl;
        } else {
            messageToSend['content'] = message;
        }
        return messageToSend; 
    }

    const upLoadFile = (file, metaData) => {
        const filePath = `chat/public/${uuid()}.jpg`;
        setUpLoadTask(storageRef.child(filePath).put(file, metaData))
        setUpLoadState("uploading");
      }

    useEffect(() => {
        console.log('has the effect been called!')
        console.log(channel, "length");
        if(channel !== null && channel !== undefined){
         const pathToUpLoad = channel.id;
         console.log(upLoadTask, "uploadtask");
         if(upLoadTask !== null){
             console.log("has this part been logged");
         upLoadTask.on('', snap => {
             console.log("here we go int the")
            const percentageUpLoaded = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
            setPercentageUpLoaded(percentageUpLoaded);
             upLoadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                 console.log(downloadUrl,"the download url")
                 console.log("what about here!")
             sendFileMessage(downloadUrl, messageRef, pathToUpLoad)
         }).catch(err => {
             console.log(err);
         })
         })
        
        

        }
    }
    },[upLoadTask]);

    const sendFileMessage = (url, ref, path) => {
        console.log(user, url, "the details");
        console.log(path, "the path passed");
        ref.child(path).push().set(createMessage(user.user, url))
        .then(() => setUpLoadState("done"))
        .catch((err) => console.log(err));
    }

    const handleTogglePicker = () => {
        setEmojiPicker(!emojiPicker);
    }

    const handleAddEmoji = () => {

    }

    return (
        <Segment className="message__form">
            {emojiPicker && (
                <Picker set="apple" onSelect={handleAddEmoji} className="emojipicker" title="Pick your emoji" emoji="point_up" />
            )}
            <Input value={message} onChange={(e) => setMessage(e.target.value)}
             fluid name="message" style={{ marginBottom: '0.7em'}} 
             label={<Button 
                icon={'add'}
                onClick={handleTogglePicker} />} 
             labelPosition="left" placeholder="Write your message"/>
            <Button.Group icon widths="2">
                <Button onClick={() => sendMessage()} color="orange" content="Add Reply" labelPosition="left" icon="edit" />
                <Button color="teal" content="Upload Media" disabled={upLoadState === "uploading"}
                   labelPosition="right" icon="cloud upload" onClick={()=> setModal(true)} />
            </Button.Group>
            
               <FileModal modal={modal} closeModal={() => setModal(false)} upLoadFile={upLoadFile} />
                <ProgressBar upLoadState={upLoadState} percentageUpLoaded={percentageUpLoaded} />
        </Segment>
    )
  
    }

export default MessagesForm;