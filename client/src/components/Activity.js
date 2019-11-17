import React from "react";
import "../styles/Activity.css";

class Activity extends React.Component {

     render(){
          return(
               <div className="activityContainer">
                    <div className="activityBody">
                         <img 
                              src={this.props.activity.image}
                              alt={this.props.activity.title}
                         />
                         <h4>{this.props.activity.title}</h4>
                    </div>
               </div>
          );
     }
}

export default Activity;