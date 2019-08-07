import React , {Component} from "react"
import PropTypes from 'prop-types';
import "../css/Student.css"

class StudentForm extends Component{
    render(){
        return(
          <div className="student-form-wrapper">
          <h3><center>Student</center></h3>
          <br />
          <form className = "student-form">
            <div className="row">
              <div className="col-25">
                <label>Student ID: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="studentId"
                  placeholder="Enter Your Student Number"
                  onChange={this.props.handleChangeStudentInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>FirstName: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  onChange={this.props.handleChangeStudentInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>LastName: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  onChange={this.props.handleChangeStudentInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>Age:</label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="age"
                  placeholder="Enter Your Age"
                  onChange={this.props.handleChangeStudentInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>Gender:</label>
              </div>
              <div className="col-75">
                <input
                  type="text" 
                  list="gender" 
                  name="gender" 
                  placeholder="Enter Your Gender" 
                  onChange={this.props.handleChangeStudentInfo}
                />
                <datalist id="gender">
                  <option value="Female" />
                  <option value="Male" />
                </datalist>
              </div>
            </div>
 
            <div className="row">
              <div className="col-25">
              </div>
              <div className="col-75">
                <button 
                  type="button" 
                  className="student-button" 
                  onClick={this.props.handleAddStudent}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
            
        )
    }
}

StudentForm.propTypes = {
    handleChangeStudentInfo: PropTypes.func,
    handleAddStudent: PropTypes.func
}

export default StudentForm