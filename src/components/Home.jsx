import React, { Component } from "react";
import bg from "../images/home2.jpg";
import '../css/Home.css';

class Home extends Component{
  render() {
    return (
      <div className="home-wrapper">
       <img src={bg} alt="Back to School" width="1267px" height="600px"className="bg-image"></img>
        
      </div>
    );
  }
}

export default Home;
