import React, { Component , Fragment} from "react";
import "../css/Student.css"
import StudentForm from '../components/StudentForm'
import student from '../images/student.jpg'
import axios from "axios";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';

class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      studentList: [],
      editStudentData:{
   
        studentId: "",
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

  toggleEditStudentModal() {
    this.setState({
      editStudentModal: ! this.state.editStudentModal
    });
  }

  // UPDATE STUDENT DETAILS
  updateStudent() {
    let { studentId, firstName, lastName, age, gender} = this.state.editStudentData;
    console.log(this.state.editStudentData);
    axios.put(`http://localhost:8080/student/${studentId}` , {
      studentId,firstName, lastName, age, gender
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      this._refreshUsers();

      this.setState({
        editStudentModal: false, editStudentData: {studentId: '', firstName: '', lastName: '', age: '', gender:''}
      })
    });
  }

  // EDIT STUDENT DETAILS
  editStudent(studentId, firstName, lastName, age, gender) {
    this.setState({
      editStudentData: { studentId, firstName, lastName, age, gender }, editStudentModal: !this.state.editStudentModal
    });
  }

  //REFRESH PAGE
  _refreshUsers() {
    axios.get('http://localhost:8080/student').then((response) => {
      this.setState({
        studentList: response.data
      })
    });
  }

// (GET METHOD) DISPLAY INITIAL FLIGHT DATA
getStudents(){
  axios.get(`http://localhost:8080/student`)
    .then(res => {
        const studentList = res.data;
        this.setState({studentList:studentList});
      })
}

//MOUNT STUDENT
componentDidMount(){
  this.getStudents();
}

// HANDLE CHANGE INFO
  handleChangeStudentInfo = e => {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      student: {
        ...prevState.student,
        [name]: value
      }
    }));
  }

  // (POST METHOD) ADD STUDENT
  handleAddStudent = e => {
    let student = this.state.student;
    let studentList = [...this.state.studentList];
    studentList.push(student);
    this.setState({studentList : studentList});
    e.preventDefault();
    console.log("post");
    console.log(student);
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
  axios.post(`http://localhost:8080/student`,student, {headers:headers})
    .then(res =>{
        console.log(res);
        console.log(res.data);
    })
}


  // (DELETE METHOD)
  deleteStudent = rowIndex => {
    let studentList = [...this.state.studentList];
    studentList.splice(rowIndex, 1);
    this.setState({studentList: studentList});

    axios.delete(`http://localhost:8080/student/${rowIndex}`)
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
            <StudentForm
              handleChangeStudentInfo={this.handleChangeStudentInfo} 
              handleAddStudent={this.handleAddStudent} 
            />
        </div>

        <div className="student-form-wrapper">  
          <img src={student} alt="Student" width="100%" height="95%" className="student"></img>
        
        </div>

        <Modal isOpen={this.state.editStudentModal} toggle={this.toggleEditStudentModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditStudentModal.bind(this)}>Edit Student details</ModalHeader>
            <ModalBody>
            
              <FormGroup>
                <Label for="studentId">Student ID</Label>
                <Input id="studentId" value={this.state.editStudentData.studentId} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.studentId = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="firstName">First Name</Label>
                <Input id="firstName" value={this.state.editStudentData.firstName} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.firstName = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="lastName">Last Name</Label>
                <Input id="lastName" value={this.state.editStudentData.lastName} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.lastName = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>
            
              <FormGroup>
                <Label for="age">Age</Label>
                <Input id="age" value={this.state.editStudentData.age} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.age = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="gender">Gender</Label>
                <Input id="gender" value={this.state.editStudentData.gender} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.gender = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="sectionId">Section ID</Label>
                <Input id="sectionId" value={this.state.editStudentData.sectionId} onChange={(e) => {
                  let { editStudentData } = this.state;
                  editStudentData.sectionId = e.target.value;
                  this.setState({ editStudentData });
                  }} 
                />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateStudent.bind(this)}>Update Student</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditStudentModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Table className='student-table'>
            <thead>
              <tr className='student-table-head'>
                <th className='student-table-cell'>STUDENT ID</th>
                <th className='student-table-cell'>FIRST NAME</th>
                <th className='student-table-cell'>LAST NAME</th>
                <th className='student-table-cell'>AGE</th>
                <th className='student-table-cell'>GENDER</th>
                <th className='student-table-cell'>SECTION ID</th>
                <th className='student-table-cell'>Action</th>
                <th className='student-table-cell'>Action</th>
              </tr>
              </thead>
              <tbody>
                {
                  this.state.studentList.map((student,index) => {
                    return(
                      <tr className='student-table-row' key ={index}>
                      <th className='student-table-cell'>{student.studentId} </th>
                      <th className='student-table-cell'>{student.firstName} </th>
                      <th className='student-table-cell'> {student.lastName}</th>
                      <th className='student-table-cell'> {student.age}</th>
                      <th className='student-table-cell'> {student.gender}</th>
                      <th className='student-table-cell'> {student.sectionId}</th>
                      <th><Button color="success" size="sm" className="mr-2" onClick={this.editStudent.bind(this, student.studentId, student.firstName, student.lastName,
                      student.age, student.gender)}>Edit</Button></th>
                      <th><Button size="sm" className="delete-btn" onClick={() =>this.deleteStudent(student.studentId)}>Delete</Button></th>
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

export default Student;