import React, { Component, Fragment } from "react"
import PropTypes from 'prop-types';
import "../css/Search.css";
import searchIcon from "../images/search-icon.png"
import axios from 'axios'

function searchingFor(term){
    return function(x){
        return x.sectionId.toString().toLowerCase().includes(term.toString().toLowerCase()) || 
        x.sectionName.toString().toLowerCase().includes(term.toString().toLowerCase());
        // || x.adviserId.toString().toLowerCase().includes(term.toString().toLowerCase()) ||
        // x.studentId.toString().toLowerCase().includes(term.toString().toLowerCase());
    }
}

class Search extends Component {
  
    constructor(props) {
        super(props);

        this.state = {
            sectionList: [],
            section:{
                sectionId: '',
                sectionName: '',
                adviserId:'',
                studentId:'',
            },
            term: ''
        };

        this.searchHandler = this.searchHandler.bind(this);
    }

    searchHandler(event){
        this.setState({ term: event.target.value})

    }
    
    //(GET METHOD) GET FLIGHT DATA
    getSectionDetails() {
        axios.get(`http://localhost:8080/section`)
            .then(res => {
                const sectionList = res.data;
                this.setState({ sectionList: sectionList });
            })
    }

    componentDidMount() {
        this.getSectionDetails();
    }

    //(DELETE METHOD)
    deleteSection = rowIndex => {
        let sectionList = [...this.state.sectionList];
        sectionList.splice(rowIndex, 1);
        this.setState({ sectionList: sectionList });

        axios.delete(`http://localhost:8080/section/${rowIndex}`)
            .then(res => {
                console.log(res);
                console.log(res.data);
            })
    }

    render() {
        const {term} = this.state;
        return (
            <Fragment>
            <div className="search-form-wrapper">  
                <center>
                    <form>
                        <input 
                            type = "text"
                            placeholder = "Search"
                            onChange = {this.searchHandler}
                            value={term}
                            className = "search-bar"
                        />
                        <img src={searchIcon} alt="search-icon" width="50px" height="50px" className="search-icon"></img>
                    </form>
                </center>  
                        
            <div className = "searchSectionDetails-display-container">
                <table className = "searchSectionDetails-table">
                    <tbody>
                        <tr className='sectionDetails-table-head'>
                            <th className='sectionDetails-table-cell'>SECTION ID</th>
                            <th className='sectionDetails-table-cell'>SECTION NAME</th>
                            <th className='sectionDetails-table-cell'>ADVISER ID</th>
                            <th className='sectionDetails-table-cell'>STUDENT ID</th>
                            <th className='sectionDetails-table-cell'>ACTION</th>
                          
                        </tr>                           
                {
                    this.state.sectionList.filter(searchingFor(term)).map((section,index) => {
                        return(
                            <tr className='sectionDetails-table-row' key={index}>
                                <th className='sectionDetails-table-cell'>{section.sectionId}</th>
                                <th className='sectionDetails-table-cell'>{section.sectionName}</th>
                                <th className='sectionDetails-table-cell'>{section.adviserId}</th>
                                <th className='sectionDetails-table-cell'>{section.studentId}</th>
                                <th className='sectionDetails-table-cell'><button type='button' className="delete-btn" onClick={() => this.deleteSection(section.sectionId)}>Delete</button></th>
                            </tr>
                        )
                    })
                }       
                    </tbody>
                </table>                      
            </div>           
        </div>
        </Fragment>
       
        )
    }
}

// Search.propTypes = {
//     deleteUser: PropTypes.func,
//     usersList: PropTypes.func
// }

export default Search