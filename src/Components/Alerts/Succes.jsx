import React from 'react';
import {Alert} from 'reactstrap'; 

class Succes extends React.Component {
    state = {  }
    render() { 
        return ( 
            <Alert color="success">
            This is a success alert — check it out!
          </Alert>
         );
    }
}
 
export default Succes;