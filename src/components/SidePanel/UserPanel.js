import React from 'react';
import { useHistory } from 'react-router-dom';
import { Grid, Menu, Form, Segment, Button, Header, Dropdown, Message, Image, Icon} from 'semantic-ui-react';
import { useUserContext } from '../../context/user_context';
import firebase from '../../firebase';

const UserPanel = () => {

    let history = useHistory();
    const { user, clearGlobalUser } = useUserContext();


    const signOutUser = () => {
        firebase.auth()
        .signOut()
        .then(() => {
               clearGlobalUser();
               history.push('/login');
        })
        .catch((err)=> {
            console.log(err);
        }) 
    }

    const dropDownOptions = () => [
        {
            key: "user",
            text:<span>Signed in as <strong>{user.user.displayName}</strong></span>,
            disabled:true
        },
        {
            key: "avatar",
            text:<span>Change Avatar</span>
        },
        {
            key:"signout",
            text:<span onClick={signOutUser}>Sign Out</span>
        }
    ]


    return (
     <Grid style={{background: '#4c3c4c'}}>
     <Grid.Column>
         <Grid.Row style={{ padding:'1.3em', margin:0}}>
             <Header inverted floated="left" as="h2">
                 <Header.Content>
                     <Icon name="code" />
                     Dev Chat
                 </Header.Content>
             </Header>
         </Grid.Row>
         <Header style={{padding:'0.25em'}} as="h4" inverted>
             <Dropdown trigger={<span>
                 <Image src={user.user.photoURL} spaced="right" avatar />
                 {user.user.displayName}</span>}  options={dropDownOptions()}/>
         </Header>
     </Grid.Column>
     </Grid>
    )
  
    }

export default UserPanel;
