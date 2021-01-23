import React, { useEffect, useState }from 'react';
import { Menu, MenuItem, Modal, Form, Button, Input, Icon} from 'semantic-ui-react';
import { useUserContext } from '../../context/user_context';
import { useChannelContext } from '../../context/channel_context';
import firebase from '../../firebase';


const Channels = () => {
    const [channels, setChannels] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [channelName, setChannelName] = useState("");
    const [channelDescription, setChannelDescription] = useState("");
    const [channelsRef, setChannelsRef] = useState(firebase.database().ref('channels'));
    const { user } = useUserContext();
    const { channel, setChannel } = useChannelContext();
    const [activeChannel, setActiveChannel] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if(formIsValid(channelName, channelDescription)) {
            setModalOpen(false);
            addChannel();
        }
    }
    
    const formIsValid = (channelName, channelDescription) => channelName && channelDescription;

    const addChannel = () => {
        const key = channelsRef.push().key;
        const newChannel = {
            id:key,
            name:channelName,
            details:channelDescription,
            createdBy: {
                name:user.user.displayName,
                avatar:user.user.photoURL
            }
        }

        channelsRef.child(key)
        .update(newChannel)
        .then(() => {
            setChannelName('');
            setChannelDescription('');
            setModalOpen(false);
            console.log("channel added");
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const addListeners = () => {
        if(channel != null && channel !== undefined) {
        let loadedChannels = [];

        channelsRef.on('child_added', (snap)=> {
            console.log(snap, "is this all the channels");
           loadedChannels.push(snap.val()); 
  setChannels(loadedChannels);
        console.log(loadedChannels, "the loaded channels")
         setChannel(loadedChannels[0]);
               setActiveChannel(loadedChannels[0]);
               console.log(activeChannel,  "the active channel");  


           
        })
         
    }
}

    useEffect(()=> {
        addListeners();
        console.log("this ran!");
        console.log(activeChannel,  "the active channel in useEffect after call");    
    },[])

    const displayChannels = (channels) => (
        channels.length > 0 && channels.map(channel => (
          <MenuItem className={activeChannel.name === channel.name ? 'active' : ''} key={channel.id} onClick={() => changeChannel(channel)} name={channel.name} style={{opacity:0.7}}>
             # {channel.name}
          </MenuItem>  
        )
    )
    )



    const changeChannel = (channel) => {
         setActiveChannel(channel);
        setChannel(channel);
        console.log(activeChannel);
    }
    return (
        <div>
      <Menu.Menu className="menu">
           <Menu.Item>
               <span>
                   <Icon name="exchange" /> CHANNELS
               </span>{"     "}
                {channels.length} <Icon name="add" onClick={() => setModalOpen(true)} />
           </Menu.Item>
           { displayChannels(channels) }
      </Menu.Menu>

      <Modal basic open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>Add a Channel</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <Input fluid value={channelName} label="Name of Channel" name="channelName" onChange={(e) => setChannelName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Input fluid value={channelDescription} label="Channel Description" name="channelDescription" onChange={(e) => setChannelDescription(e.target.value)}/>
                </Form.Field>
            </Form>
          </Modal.Content>
          <Modal.Actions>
              <Button color="green" inverted onClick={handleSubmit}>
                  <Icon name="checkmark" /> Add
              </Button>
              <Button color="red" inverted onClick={()=> setModalOpen(false)}>
                  <Icon name="remove"/> Cancel
              </Button>
          </Modal.Actions>
      </Modal>
   
   </div>
    )
  
    }

export default Channels;
