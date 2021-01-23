import React, {useEffect, useState} from 'react';
import { Grid, Menu, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import { useUserContext } from '../../context/user_context';
import firebase from 'firebase';

const DirectMessages = () => {

    const [users, setUsers] = useState([])
    const { user } = useUserContext();
    const [usersRef, setUsersRef] = useState(firebase.database().ref('users'));
    const [connectedRef, setConnectedRef] = useState(firebase.database().ref('.info/connected'));
    const [presenceRef, setPresenceRef] = useState(firebase.database().ref('presence'));


    useEffect(()=> {
        console.log(user)
        if(user !== []) {
            addListeners(user.user.uid);
        }
         if(users !== []) {
            addListeners2(user.user.uid)
        }
    },[user, users]);

    const addListeners2 = (currentUserUid) => {
        connectedRef.on('value', snap => {
            if(snap.val() === true) {
              const ref = presenceRef.child(currentUserUid);  
              ref.set(true);  
              ref.onDisconnect().remove(err => {
                  if(err !== null) {
                      console.log(err);
                  }
              }) 
            }
        });

        presenceRef.on('child_added', (snap) => {
            if(currentUserUid !== snap.key) {
                 addStatusToUser(snap.key);
            }
        })

        presenceRef.on('child_removed',(snap) => {
         if(currentUserUid !== snap.key) {
             addStatusToUser(snap.key, false);
         }
     })
    }

    const addListeners = (currentUserUid) => {
        let loadedUsers = [];
           usersRef.on('child_added', (snap) => {
            if(currentUserUid !== snap.key) {
                console.log("true1")
                let user1 = snap.val();
                user1['uid'] = snap.key;
                user1['status'] = 'offline';
                loadedUsers.push(user1);
                setUsers(loadedUsers)
                console.log(loadedUsers);
            }   
           })

         

           } 
           
    const addStatusToUser = (userId, connected = true) => {
        console.log(users, "llwllh")
        if(users !== undefined){
            console.log(users, "in messages users")
        const updatedUsers = users.reduce((acc, user) => {
            if(user.uid === userId) {
                user['status'] = `${connected ? 'online' : 'offline'}`;
            }
            return acc.concat(user);
        }, []);
        setUsers(updatedUsers)
    }
    }
    const isUserOnline = (user) => user.status === 'online';

    return (
    <Menu.Menu className="menu">
        <Menu.Item>
            <span>
                <Icon name="mail" /> DIRECT MESSAGES
            </span> {' '}
            ({users.length})
        </Menu.Item>
        {users.map(user => (
            <Menu.Item key={user.uid} onClick={()=> console.log(user)} style={{opacity:0.7, fontStyle:'italic'}} >
               <Icon name="circle" color={isUserOnline(user) ? 'green' : 'red'} />
               @ {user.name}
            </Menu.Item>
        )
    )}
    </Menu.Menu>
   
    )
  
    }

export default DirectMessages;
