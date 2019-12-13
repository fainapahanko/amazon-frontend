import React from 'react';
import { Alert } from 'reactstrap';

class Error extends React.Component {
    state = { 

    }
    render() { 
        return ( 
            <Alert color="danger">
                Something went wrong. Try again later
            </Alert>
         );
    }
}
 
export default Error;