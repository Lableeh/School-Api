import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import "../css/Section";

class SectionTable extends Component{
    
    render(){
        return(
    
                <Fragment>
                <div className="section-display-container">
                <table className='section-table'>
                    <thead>
                    <tr className='section-table-head'>
                        <th className='section-table-cell'>SECTION ID</th>
                        <th className='section-table-cell'>SECTION NAME</th>
                        <th className='section-table-cell'>ACTION</th>
                        <th className='section-table-cell'>ACTION</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.props.sectionList.map((section, index) =>{
                            return (
                                <tr className='section-table-row' key={index}>
                                    <td className='section-table-cell'>{section.sectionId}</td>
                                    <td className='section-table-cell'>{section.sectionName}</td>
                            <td className='section-table-cell'><button type='button' className="edit-btn" onClick={this.openPopupbox}>Edit</button></td>
                            <td className='section-table-cell'><button type='button' className="delete-btn" onClick={() => this.props.deleteSection(section.sectionId)}>Delete</button></td>             
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

SectionTable.propTypes = {
    deleteSection: PropTypes.func,
    sectionList: PropTypes.func
    
}

export default SecctionTable