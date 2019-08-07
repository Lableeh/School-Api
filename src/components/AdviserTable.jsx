import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import '../css/Adviser.css';

class AdviserTable extends Component{
    
    render(){
        return(
            <Fragment>
                <div className="adviser-display-container">
                <table className='adviser-table'>
                <tbody>
                    <tr className='adviser-table-head'>
                        <th className='adviser-table-cell'>ADVISER ID</th>
                        <th className='adviser-table-cell'>FIRST NAME</th>
                        <th className='adviser-table-cell'>LAST NAME</th>
                        <th className='adviser-table-cell'>AGE</th>
                        <th className='adviser-table-cell'>GENDER</th>
                        <th className='adviser-table-cell'>ACTION</th>
                    </tr>
                    {
                        this.props.adviserList.map((adviser, index) =>{
                            return (
                                <tr className='adviser-table-row' key={index}>
                                    <th className='adviser-table-cell'>{adviser.adviserId}</th>
                                    <th className='adviser-table-cell'>{adviser.firstName}</th>
                                    <th className='adviser-table-cell'>{adviser.lastName}</th>
                                    <th className='adviser-table-cell'>{adviser.age}</th>
                                    <th className='adviser-table-cell'>{adviser.gender}</th>
                                    <th className='adviser-table-cell'><button type='button' className="delete-btn" onClick={() => this.props.deleteAdviser(adviser.adviserId)}>Delete</button></th>
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

AdviserTable.propTypes = {
    deleteAdviser: PropTypes.func,
    adviserList: PropTypes.func
}

export default AdviserTable
