
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Validation from 'react-validation';
import validator from 'validator';
//import { Breadcrumb, BreadcrumbItem,
  //Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';


class App extends Component {     
      constructor(props) {
        super(props)
        
        this.state = {
          
          users:[],
         
            name: '',
            price: ''
        
         
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.logChange = this.logChange.bind(this);  
    }

    
   // this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  
 
/*logChange(e) {
this.setState({[e.target.name]: e.target.value});  
}*/
componentDidMount(){    
 this.getProducts();
 }

/* addProduct = _ =>{
const {user}=this.state;
fetch(`http://localhost:9000/testAPI/add?name=${user.name}&price=${user.price}`)
.then(res=>res.json())
.then(this.getProducts)
.catch(err=>console.error(err))
 }
/*


You can do something like below

handleSubmit (event) {
  //alert('A list was submitted: ' + this.state.formvalue);
  event.preventDefault();
  fetch('your post url here', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: this.state.name,
      price: this.state.price
      
    })
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err);
}*/



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
    body: JSON.stringify(
      data
      
    )
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
 
  render() {
   //const {users,user}=this.state;
    return (
      <div className="container">
                <form onSubmit={this.handleSubmit} method="POST">
                    <label>Name</label>
                    <input onChange={this.logChange} value={this.state.value} className="form-control"  placeholder='0' name='name'/>
                    <label>Price</label>
                    <input onChange={this.logChange} value={this.state.value} className="form-control"  placeholder='0' name='price' />
                    
                        <button className="btn btn-uth-submit">Submit</button>
                    
                </form>
                {this.state.users.map(
              this.showUsers
            )}
            </div>     /* {this.state.users.map(user =>
         <div key={user.id}>{user.name}  - {user.school}</div>
       )}*/
 

    )
  }
}
export default App;