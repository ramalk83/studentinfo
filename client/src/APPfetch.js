
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Validation from 'react-validation';
import validator from 'validator';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import { Breadcrumb, BreadcrumbItem,
  //Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';


class App extends Component {     
      constructor(props) {
        super(props)
        
        this.state = {
          modalIsOpen: false,
          users:[],         
            name: '',
            price: ''
               
        }
        
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.logChange = this.logChange.bind(this);  
    }

    openModal(user) {
      this.setState({
          modalIsOpen: true,
          name: user.name,
          price: user.price,
          id: user.id
      });
  }

  closeModal() {
      this.setState({
          modalIsOpen: false
      });
  }
 
componentDidMount(){    
 this.getProducts();
 }

logChange(e) {
this.setState({[e.target.name]: e.target.value});  
}

  getProducts=_=>{
    fetch('http://localhost:9000/testAPI/view')
    .then(res =>res.json())//response.json())
    .then(users => this.setState({users},()=>console.log('fetched',users)));
  }


  showUsers=user =>
  <div key={user.id}>
    <label><h3>{user.name}</h3>
   <span> {user.price}</span></label>  
   </div>


handleSubmit(e){
  e.preventDefault();
  var data = {
    name: this.state.name,
    price: this.state.price
}
fetch(`http://localhost:9000/testAPI/add`, {
       method: 'POST',
       headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
}).then(function(data) {
    console.log(data)    
    if(data == "success"){
       this.setState({msg: "Thanks for registering"});  
       
    }
}).catch(function(err) {
    console.log(err)
   
});
}
 

handleEdit(event) {
  //Edit functionality
  event.preventDefault()
  var data = {
      name: this.state.name,
      price: this.state.price,
      id: this.state.id
  }
  fetch('http://localhost:9000/testAPI/edit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
  }).then(function(response) {
      if (response.status >= 400) {
          throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(data) {
      console.log(data)
      if (data === "success") {
          this.setState({
              msg: "User has been edited."
          });
      }
  }).catch(function(err) {
      console.log(err)
  });
}


deleteMember(user){
  var data = {
      id: this.state.id
  }
  fetch(`http://localhost:9000/testAPI/delete`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
  }).then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
  }).then(function(data) {
      if(data === "success"){
         this.setState({msg: "User has been deleted."});  
      }
  }).catch(function(err) {
      console.log(err)
  });
}

  render() {
    //const tasks = this.props.tasks;
   const {users,user}=this.state;
   const {data} = this.state;
    return (
      <div className="container">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Name</label>
                    <input onChange={this.logChange} value={this.state.value} className="form-control"  placeholder='0' name='name'/>
                    <label>Price</label>
                    <input onChange={this.logChange} value={this.state.value} className="form-control"  placeholder='0' name='price' />
                    <button className="btn btn-uth-submit">Submit</button>
                    
                </form>
                <div className="panel panel-default p50 uth-panel">
                <table className="table table-hover">
                    <thead>
                        <tr>
                        <th>Id</th>
                            <th>user name</th>
                            <th>user price</th>
                           
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map(user =>
                        <tr key={user.id}>
                           <td>{user.id} </td>
                        <td>{user.name} </td>
                       
                        <td>{user.price}</td>
                        <td><a onClick={this.handleEdit}>Edit</a>  |  
                        <a onClick={() => this.deleteMember(user)}>Delete</a></td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            </div>    
 

    )
  }
}
export default App;