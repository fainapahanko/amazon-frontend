import React from 'react';
import {Alert} from 'reactstrap'; 

class Succes extends React.Component {
    state = {  }
    render() { 
        return ( 
            <Alert color="success">
            saved successfully
          </Alert>
         );
    }
}
 
export default Succes;