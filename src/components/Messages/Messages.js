import React, { useEffect, useState } from 'react';
import {Segment, Comment} from 'semantic-ui-react';
import MessagesHeader from './MessagesHeader';
import MessagesForm from './MessagesForm';
import  {useChannelContext} from '../../context/channel_context';
import { useUserContext } from '../../context/user_context';
import firebase from '../../firebase';
import Message from './Message';
import { useHistory } from 'react-router-dom';

const Messages = () => {

    const { channel } = useChannelContext();
    const { user }  = useUserContext();
    const [messagesForActiveChannel, setMessagesForActiveChannel] = useState([]);
    const history = useHistory();
    const [numberOfUsers, setNumberOfUsers] = useState('');
    
    useEffect(()=> {
        
   setMessagesForActiveChannel('')
   //     console.log(channel.id, "the channel");
  //     if(channel.length !== 0) {  
   //     if(channel !== undefined || channel !== null || channel !== [] || channel !== {} || channel.id !== null ) { 
    if(channel !== undefined && channel !== null) { 
        console.log(channel, "the bloody channel");
   const foundMessagesForChannelLink = firebase.database().ref('messages').child(channel.id)
   const arr = [];
   foundMessagesForChannelLink.on('child_added', (snap)=> {
        arr.push(snap.val())
        setMessagesForActiveChannel(arr);
        const numberofUsers = countUniqueUsers(arr)
        setNumberOfUsers(numberofUsers);
        history.push('/')
        console.log(channel.id, "after");
    }); 

       }
        
    },[channel])


    const countUniqueUsers = (messages) => {
            const uniqueUsers = messages.reduce((acc, message) => {
                if(!acc.includes(message.user.name)) {
                    acc.push(message.user.name);
                }
                return acc;
            },[])
            return `${uniqueUsers.length}`;
    }

  

    return (
        
     <div style={{width:'700px'}}>
         <MessagesHeader channel={channel} numberOfUsers={numberOfUsers} />
         <Segment>
             <Comment.Group className="messages">
             <Message activeMess={messagesForActiveChannel} />
                  
              <div></div>
             </Comment.Group>
         </Segment>

         <MessagesForm />
        </div>
   
    )
  
    }

export default Messages;
