import React , {Component} from "react"
import PropTypes from 'prop-types';
import "../css/Section.css";

class SectionForm extends Component{
    render(){
        return(
          <div className="section-form-wrapper">
          <h3><center>Section</center></h3>
          <br />
          <form className = "section-form">
            <div className="row">
              <div className="col-25">
                <label>Section ID: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="sectionId"
                  placeholder="Enter Section ID"
                  onChange={this.props.handleChangeSectionInfo}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-25">
                <label>Section Name: </label>
              </div>
              <div className="col-75">
                <input
                  type="text"
                  name="sectionName"
                  placeholder="Enter Section Name"
                  onChange={this.props.handleChangeSectionInfo}
                />
              </div>
            </div>

            
 
            <div className="row">
              <div className="col-25">
              </div>
              <div className="col-75">
                <button 
                  type="button" 
                  className="section-button" 
                  onClick={this.props.handleAddSection}>
                  Add
                </button>
              </div>
            </div>
          </form>
        </div>
            
        )
    }
}

SectionForm.propTypes = {
    handleChangeSectionInfo: PropTypes.func,
    handleAddSection: PropTypes.func
}

export default SectionForm