import React from "react";
import "../styles/Comment.css";

class Comment extends React.Component {
     render(){
          return(
               <div className="commentContainer">
                    <div className="commentBody">
                         <p>{this.props.text}</p>
                    </div>
               </div>
          );
     }
}

export default Comment;