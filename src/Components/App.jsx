import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NavigationBar from './NavigationBar'
import AddProduct from './AddProduct'
import Main from './Main'
import SpecificProduct from './SpecificProduct'
import "../index.css"

class App extends React.Component {
    render() { 
        return ( 
            <Router>
                <NavigationBar />
                <Route path="/" exact component={Main} />
                <Route path="/addProduct" component={AddProduct} />
                <Switch>
                    <Route path="/details/:id" component={SpecificProduct} />
                </Switch>
            </Router>
        );
    }
}
 
export default App;