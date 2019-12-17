import React from 'react';
import Moment from 'react-moment';
import {Button} from 'reactstrap'
const divStyle = {
    width: "100%",
    backgroundColor: "white",
    boxShadow: "5px 7px 9px 0px rgba(0,0,0,0.75)"
}

class Comment extends React.Component {
    state = {  }

    toDelete = async() => {
        let response = await fetch("https://amazon-be.herokuapp.com/comments/" + this.props.comment.commentID, {
            method: "DELETE"
        })
        return response
    }
    render() { 
        return ( 
            <div className="my-4" style={divStyle}>
                <div className="pt-3 pl-3" style={{fontSize: "24px"}}>{this.props.comment.userName}</div> <br/>
                <div className="pl-3" style={{fontSize: "20px"}}>{this.props.comment.text}</div>
                <Moment className="pl-3"  fromNow>{this.props.comment.createdAt}</Moment>
                <div  className="pl-3 pb-3 pt-2" ><Button onClick={this.toDelete}>Delete</Button></div>
            </div>
        );
    }
}
 
export default Comment;