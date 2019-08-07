import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import "../css/Student.css";

class StudentTable extends Component{
    
    render(){
        return(
    
                <Fragment>
                <div className="student-display-container">
                <table className='student-table'>
                    <thead>
                    <tr className='student-table-head'>
                        <th className='student-table-cell'>STUDENT ID</th>
                        <th className='student-table-cell'>FIRST NAME</th>
                        <th className='student-table-cell'>LAST NAME</th>
                        <th className='student-table-cell'>AGE</th>
                        <th className='student-table-cell'>GENDER</th>
                        <th className='student-table-cell'>ACTION</th>
                        <th className='student-table-cell'>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.studentList.map((student, index) =>{
                            return (
                                <tr className='student-table-row' key={index}>
                                    <td className='student-table-cell'>{student.studentId}</td>
                                    <td className='student-table-cell'>{student.firstName}</td>
                                    <td className='student-table-cell'>{student.lastName}</td>
                                    <td className='student-table-cell'>{student.age}</td>
                                    <td className='student-table-cell'>{student.gender}</td>
                            <td className='student-table-cell'><button type='button' className="edit-btn" onClick={this.openPopupbox}>Edit</button></td>
                            <td className='student-table-cell'><button type='button' className="delete-btn" onClick={() => this.props.deleteStudent(student.studentId)}>Delete</button></td>             
                                </tr>
                            )
                    })
                    }
                </tbody>
                </table>      
                </div>
            </Fragment>
    
        )
    }
}

StudentTable.propTypes = {
    deleteStudent: PropTypes.func,
    studentList: PropTypes.func
    
}

export default StudentTable