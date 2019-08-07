import React , {Component} from "react"
import PropTypes from 'prop-types';
import "../css/Adviser.css"


class AdviserForm extends Component{
    render(){
        return(
          <div className='adviser-form-wrapper'> 
      
     
        <form>
          <h3><center>Adviser</center></h3>
          <br/>
          <div className="row">
            {/* <div className="col-25">
              <p>.</p>
              <img src={mUser} alt="Adviser Icon" width="110px" height="110px" className="mUser"></img>
            </div> */}
          </div>
          <div className="row">
            <div className="col-25">
              <label>Adviser Id: </label>
            </div>
            <div className="col-75">
              <input 
                type="text" 
                name="adviserId" 
                placeholder="Enter Your Adviser ID" 
                onChange={this.props.handleChangeAdviserInfo} 
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>First Name: </label>
            </div>
            <div className="col-75">
              <input 
                type="text" 
                name="firstName" 
                placeholder="Enter Your First Name" 
                onChange={this.props.handleChangeAdviserInfo} 
              />
            </div>
          </div>

          <div className="row">
            <div className="col-25">
              <label>Last Name:</label>
            </div>
            <div className="col-75">
              <input 
              type="text" 
              name="lastName" 
              placeholder="Enter Your Last Name" 
              onChange={this.props.handleChangeAdviserInfo} 
              />
            </div>
          </div>
          
          <div className="row">
            <div className="col-25">
              <label>Age: </label>
            </div>

            <div className="col-75">
              <input 
                type="text" 
                name="age" 
                placeholder="Enter Your Age" 
                onChange={this.props.handleChangeAdviserInfo} 
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
                  onChange={this.props.handleChangeAdviserInfo}
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
                className="adviser-button" 
                onClick={this.props.handleAddAdviser}>Add
              </button>
            </div>
          </div>
        </form> 
            
      </div>
        )
    }
}

AdviserForm.propTypes = {
    handleChangeAdviserInfo: PropTypes.func,
    handleAddAdviser: PropTypes.func
}

export default AdviserForm