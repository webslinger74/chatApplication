import React from 'react';
import './App.css';
import { useUserContext } from '../src/context/user_context';
import { useHistory } from 'react-router-dom';
import ColorPanel from '../src/components/ColorPanel/ColorPanel';
import Messages from '../src/components/Messages/Messages';
import SidePanel from '../src/components/SidePanel/SidePanel';
import MetaPanel from '../src/components/MetaPanel/MetaPanel';
import { Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';

const App = () => {

  const { user } = useUserContext();
  let history = useHistory();

    return (
      <div className="App">
   
     {user !== undefined && user ? (


       <Grid columns-="equal" className="app" style={{ background: '#eee'}} >
         <ColorPanel />
         <SidePanel />
         <Grid.Column style={{ marginLeft: 320}}>
             <Messages />
         </Grid.Column>
         <Grid.Column style={{ marginLeft:820 }}>   
            <MetaPanel />
         </Grid.Column>
     
       </Grid>
       

     ) : history.push('/login')
      } 
      </div>
    );
  }


export default App;
