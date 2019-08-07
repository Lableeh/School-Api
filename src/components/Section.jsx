import React, { Component , Fragment} from "react";
import "../css/Section.css"
import SectionForm from '../components/SectionForm'
import section from '../images/section.jpg'
import axios from "axios";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.css';

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sectionList: [],
      editSectionData:{
   
        sectionId: "",
        sectionName: ""
      },
      editSectionModal: false
    };
  }

  componentWillMount() {
    this._refreshUsers();
  }

  toggleEditSectionModal() {
    this.setState({
      editSectionModal: ! this.state.editSectionModal
    });
  }

  updateSection() {
    let { sectionId, sectionName} = this.state.editSectionData;
    console.log(this.state.editSectionData);
    axios.put(`http://localhost:8080/section/${sectionId}` , {
      sectionId,sectionName
    })
    .then((response) => {
      console.log(response);
      console.log(response.data);
      this._refreshUsers();

      this.setState({
        editSectionModal: false, editSectionData: {sectionId: '', sectionName: ''}
      })
    });
  }

  editSection(sectionId, sectionName) {
    this.setState({
      editSectionData: { sectionId, sectionName}, editSectionModal: !this.state.editSectionModal
    });
  }

  _refreshUsers() {
    axios.get('http://localhost:8080/section').then((response) => {
      this.setState({
        sectionList: response.data
      })
    });
  }

// (GET METHOD) DISPLAY INITIAL FLIGHT DATA
getSections(){
  axios.get(`http://localhost:8080/section`)
    .then(res => {
        const sectionList = res.data;
        this.setState({sectionList:sectionList});
      })
}


componentDidMount(){
  this.getSections();
}


  handleChangeSectionInfo = e => {
    const {name, value} = e.target;
    this.setState((prevState) => ({
      section: {
        ...prevState.section,
        [name]: value
      }
    }));
  }

  // (POST METHOD) ADD STUDENT
  handleAddSection = e => {
    let section = this.state.section;
    let sectionList = [...this.state.sectionList];
    sectionList.push(section);
    this.setState({sectionList : sectionList});
    e.preventDefault();
    console.log("post");
    console.log(section);
    let headers = {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'DELETE, POST, GET, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  }
  axios.post(`http://localhost:8080/section`,section, {headers:headers})
    .then(res =>{
        console.log(res);
        console.log(res.data);
    })
}


  // (DELETE METHOD)
  deleteSection = rowIndex => {
    let sectionList = [...this.state.sectionList];
    sectionList.splice(rowIndex, 1);
    this.setState({sectionList: sectionList});

    axios.delete(`http://localhost:8080/section/${rowIndex}`)
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
            <SectionForm
              handleChangeSectionInfo={this.handleChangeSectionInfo} 
              handleAddSection={this.handleAddSection} 
            />
        </div>

        <div className="section-form-wrapper">  
          <img src={section} alt="Section" width="100%" height="100%" className="section"></img>
        
        </div>

        <Modal isOpen={this.state.editSectionModal} toggle={this.toggleEditSectionModal.bind(this)}>
          <ModalHeader toggle={this.toggleEditSectionModal.bind(this)}>Edit Section details</ModalHeader>
            <ModalBody>
            
              <FormGroup>
                <Label for="sectionId">Section ID</Label>
                <Input id="sectionId" value={this.state.editSectionData.sectionId} onChange={(e) => {
                  let { editSectionData } = this.state;
                  editSectionData.sectionId = e.target.value;
                  this.setState({ editSectionData });
                  }} 
                />
              </FormGroup>

              <FormGroup>
                <Label for="sectionName">Section Name</Label>
                <Input id="sectionName" value={this.state.editSectionData.sectionName} onChange={(e) => {
                  let { editSectionData } = this.state;
                  editSectionData.sectionName = e.target.value;
                  this.setState({ editSectionData });
                  }} 
                />
              </FormGroup>

            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={this.updateSection.bind(this)}>Update Section</Button>{' '}
              <Button color="secondary" onClick={this.toggleEditSectionModal.bind(this)}>Cancel</Button>
            </ModalFooter>
          </Modal>

          <Table className='section-table'>
            <thead>
              <tr className='section-table-head'>
                <th className='section-table-cell'>SECTION ID</th>
                <th className='section-table-cell'>SECTION NAME</th>
                <th className='section-table-cell'>Action</th>
                <th className='section-table-cell'>Action</th>
              </tr>
              </thead>
              <tbody>
                {
                  this.state.sectionList.map((section,index) => {
                    return(
                      <tr className='section-table-row' key ={index}>
                      <th className='section-table-cell'>{section.sectionId} </th>
                      <th className='section-table-cell'>{section.sectionName} </th>
                      <th><Button color="success" size="sm" className="mr-2" onClick={this.editSection.bind(this, section.sectionId, section.sectionName)}>Edit</Button></th>
                      <th><Button size="sm" className="delete-btn" onClick={() =>this.deleteSection(section.sectionId)}>Delete</Button></th>
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

export default Section;