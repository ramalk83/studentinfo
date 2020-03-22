
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Validation from 'react-validation';
//import { Breadcrumb, BreadcrumbItem,
  //Button, Form, FormGroup, Label, Input, Col, FormFeedback } from 'reactstrap';


class App extends Component {
  constructor(props)
  {
    super(props);
    this.state={users:[],
      name: '',
      price: '',
    };
   // this.handleInputChange = this.handleInputChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
  }
 

/*handleSubmit(event) {
  event.preventDefault()
  var data = {
      name: this.state.name,
      email: this.state.price
  }
  console.log(data)

  fetch("http://localhost:9000/testAPI", {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)
}).then(function(response) {
    if (response.status >= 400) {
      throw new Error("Bad response from server");
    }
    return response.json();
}).then(function(data) {
    console.log(data)    
    if(data === "success"){
       this.setState({msg: "Thanks for registering"});  
    }
}).catch(function(err) {
    console.log(err)
});
}

logChange(e) {
this.setState({[e.target.name]: e.target.value});  
}*/



  componentDidMount(){    
   this.getProducts();
  }

  getProducts=_=>{
    fetch('http://localhost:9000/testAPI')
    .then(res =>res.json())//response.json())
    .then(users => this.setState({users},()=>console.log('fetched',users)));
  }


  showUsers=user =>
  <div key={user.id}>
    <label><h3>{user.name}</h3>
   <span> {user.price}</span></label>  </div>
  
  render() {
    const {users}=this.state;
    return (
      <div className="App">
            {this.state.users.map(
              this.showUsers
            )}
      </div>     
       
      /* {this.state.users.map(user =>
         <div key={user.id}>{user.name}  - {user.school}</div>
       )}*/
 

    )
  }
}
export default App;