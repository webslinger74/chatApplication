import React, {useState} from 'react';
import {Segment, Accordion, Header, Icon } from 'semantic-ui-react';

const MetaPanel = () => {

    const [activeIndex, setActiveIndex] = useState(0)


  
    const setActiveIndexFunction = () => {

    }

    return (
     <Segment>
         <Header as="h3" attached="top">
             About # channel 
            
         </Header>
         <Accordion styled attached="true">
             <Accordion.Title active={activeIndex === 0 } index={0} onClick={setActiveIndexFunction}>
             </Accordion.Title>
         </Accordion>
     </Segment>
    )
  
    }

export default MetaPanel;
