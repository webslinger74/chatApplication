import React from 'react';
import { Image, Comment} from 'semantic-ui-react';
import { useUserContext } from '../../context/user_context';

const Message = ({activeMess}) => {

    const { user } = useUserContext();
    const isOwnMessage = (message, user) => {

    }

    const isImage = (message) => {
        return message.hasOwnProperty('image') && !message.hasOwnProperty('content');
    }

    const getMessages = () => activeMess.map((mess) => (
        <div className="mess">
            <Comment>
               <Comment.Avatar src={mess.user.avatar} />
               <Comment.Content className={isOwnMessage(mess, user)}>
                   <span><strong>{mess.user.name}</strong></span><span>    </span>
                    
                    {isImage(mess) ? <Image src={mess.image} className="message__image" /> :
                    <Comment.Text>{mess.content}</Comment.Text>}

            </Comment.Content>
            </Comment>
        </div>
    ))

    return (
     <div style={{width:'400px'}}>
         {activeMess.length >0 ?
         <div>{getMessages()}</div>:''}
       
        </div>
   
    )
  
    }

export default Message;
