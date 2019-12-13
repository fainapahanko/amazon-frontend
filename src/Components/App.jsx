import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import AddProduct from './AddProduct'
import Main from './Main'
import "../index.css"

class App extends React.Component {
    state = {  }
    render() { 
        return ( 
            <Router>
                <NavigationBar />
                <Route path="/" exact component={Main} />
                <Route path="/addProduct" component={AddProduct} />
            </Router>
        );
    }
}
 
export default App;