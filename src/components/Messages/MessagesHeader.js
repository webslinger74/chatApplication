import React from 'react';
import {Segment, Header, Input, Icon} from 'semantic-ui-react';


const MessagesHeader = ({channel, numberOfUsers}) => {


    return (
    <Segment clearing>
        <Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0}}>
           
           <span> {channel ? channel.name : ''}
            <Icon name={"star outline"} color="black" />
            </span>
            <Header.Subheader>{numberOfUsers} Users</Header.Subheader>
        </Header>
        <Header floated="right">
            <Input size="mini" icon="search" name="searchItem" placeholder="Search Messages" />
        </Header>
</Segment>   
    )
  
    }

export default MessagesHeader;