import React, { Component , Fragment} from "react";
import "../css/Adviser.css"
import AdviserForm from '../components/AdviserForm'
import adviser from '../images/adviser.jpg'
import axios from "axios";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Adviser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      adviserList: [],
      editAdviserData:{
   
        adviserId: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        sectionId: ""
      },
      editStudentModal: false
    };
  }

  componentWillMount() {
    this._refreshUsers();
  }

  toggleEditAdviserModal() {
    this.setState({
      editAdviserModal: ! this.state.editAdviserModal
    });
  }

  // UPDATE ADVISER DETAILS
  updateAdviser() {
    let { adviserId, firstName, lastName, age, gender} = this.state.editAdviserData;
    console.log(this.state.editAdviserData);
    axios.put(`http://localhost:8080/adviser/${adviserId}` , {
      adviserId,firstName, lastName, age, gender
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      this._refreshUsers();

      this.setState({
        editAdviserModal: false, editAdviserData: {adviserId: '', firstName: '', lastName: '', age: '', gender:''}
      })
    });
  }

  // EDIT ADVISER DETAILS
  editAdviser(adviserId, firstName, lastName, age, gender) {
    this.setState({
      editAdviserData: { adviserId, firstName, lastName, age, gender }, editAdviserModal: !this.state.editAdviserModal
    });
  }

  //REFRESH PAGE
  _refreshUsers() {
    axios.get('http://localhost:8080/adviser').then((response) => {
      this.setState({
        studentList: response.data
      })
    });
  }

// (GET METHOD) DISPLAY INITIAL ADVISER DATA
getAdvisers(){
  axios.get(`http://localhost:8080/adviser`)
    .then(res => {
        const adviserList = res.data;
        this.setState({adviserList:adviserList});
      })
}

//MOUNT STUDENT
componentDidMount(){
  this.getAdvisers();
}

// HANDLE CHANGE INFO
  handleChangeAdviserInfo = e => {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      adviser: {
        ...prevState.adviser,
        [name]: value
      }
    }));
  }

  // (POST METHOD) ADD ADVISER
  handleAddAdviser = e => {
    let adviser = this.state.adviser;
    let adviserList = [...this.state.adviserList];
    adviserList.push(adviser);
    this.setState({adviserList : adviserList});
    e.preventDefault();
    console.log("post");
    console.log(adviser);
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
  axios.post(`http://localhost:8080/adviser`,adviser, {headers:headers})
    .then(res =>{
        console.log(res);
        console.log(res.data);
    })
}


  // (DELETE METHOD)
  deleteAdviser = rowIndex => {
    let adviserList = [...this.state.adviserList];
    adviserList.splice(rowIndex, 1);
    this.setState({adviserList: adviserList});

    axios.delete(`http://localhost:8080/adviser/${rowIndex}`)
    .then(res =>{
        console.log(res);
        console.log(res.data);
        this._refreshUsers();
    })
  }


  render() {
  

    return (
      <div className="body-wrapper">
        
        <div className='forms-panel'>
            <AdviserForm
              handleChangeAdviserInfo={this.handleChangeAdviserInfo} 
              handleAddAdviser={this.handleAddAdviser} 
            />
        </div>

        <div className="adviser-form-wrapper">  
          <img src={adviser} alt="Adviser" width="100%" height="95%" className="adviser"></img>
        
        </div>

        <Modal isOpen={this.state.editAdviserModal} toggle={this.toggleEditAdviserModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditAdviserModal.bind(this)}>Edit Adviser details</ModalHeader>
            <ModalBody>
            
              <FormGroup>
                <Label for="adviserId">Adviser ID</Label>
                <Input id="adviserId" value={this.state.editAdviserData.adviserId} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.adviserId = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.editAdviserData.firstName} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.firstName = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.editAdviserData.lastName} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.lastName = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>
            
              <FormGroup>
                <Label for="age">Age</Label>
                <Input id="age" value={this.state.editAdviserData.age} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.age = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input id="gender" value={this.state.editAdviserData.gender} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.gender = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="sectionId">Section ID</Label>
                <Input id="sectionId" value={this.state.editAdviserData.sectionId} onChange={(e) => {
                  let { editAdviserData } = this.state;
                  editAdviserData.sectionId = e.target.value;
                  this.setState({ editAdviserData });
                  }} 
                />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateAdviser.bind(this)}>Update Adviser</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditAdviserModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Table className='adviser-table'>
            <thead>
              <tr className='adviser-table-head'>
                <th className='adviser-table-cell'>ADVISER ID</th>
                <th className='adviser-table-cell'>FIRST NAME</th>
                <th className='adviser-table-cell'>LAST NAME</th>
                <th className='adviser-table-cell'>AGE</th>
                <th className='adviser-table-cell'>GENDER</th>
                <th className='adviser-table-cell'>SECTION ID</th>
                <th className='adviser-table-cell'>Action</th>
                <th className='adviser-table-cell'>Action</th>
              </tr>
              </thead>
              <tbody>
                {
                  this.state.adviserList.map((adviser,index) => {
                    return(
                      <tr className='adviser-table-row' key ={index}>
                      <th className='adviser-table-cell'>{adviser.adviserId} </th>
                      <th className='adviser-table-cell'>{adviser.firstName} </th>
                      <th className='adviser-table-cell'> {adviser.lastName}</th>
                      <th className='adviser-table-cell'> {adviser.age}</th>
                      <th className='adviser-table-cell'> {adviser.gender}</th>
                      <th className='adviser-table-cell'> {adviser.sectionId}</th>
                      <th><Button color="success" size="sm" className="mr-2" onClick={this.editAdviser.bind(this, adviser.adviserId, adviser.firstName, adviser.lastName,
                      adviser.age, adviser.gender)}>Edit</Button></th>
                      <th><Button size="sm" className="delete-btn" onClick={() =>this.deleteAdviser(adviser.adviserId)}>Delete</Button></th>
                      </tr>
                      )
                    }
                  )
                }
              </tbody>
          </Table>
      </div>
    
    );
  }
}

export default Adviser;