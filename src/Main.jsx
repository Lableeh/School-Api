import React, { Component } from "react";
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import Home from "./components/Home";
import Section from "./components/Section";
import Student from "./components/Student";
import Adviser from "./components/Adviser";
import Search from "./components/Search";

class Main extends Component {
  render() {
    
    return (
        <HashRouter>
        <div>
        
          <ul className="header">
            <li><NavLink to="/Home">Home</NavLink></li>
            <li><NavLink to="/Section">Section</NavLink></li>
            <li><NavLink to="/Student">Student</NavLink></li>
            <li><NavLink to="/Adviser">Adviser</NavLink></li>
            <li><NavLink to="/Search">Search</NavLink></li>        
          </ul>
          <div className="content">
            <Route exact path="/Home" component={Home}/>
            <Route path="/Section" component={Section}/>
            <Route path="/Student" component={Student}/>
            <Route path="/Adviser" component={Adviser}/>
            <Route path="/Search" component={Search}/>
           
          </div>
        </div>
      </HashRouter>
    );
  }
}
 
export default Main;