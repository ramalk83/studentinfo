import React from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class EditComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      campName: "",
      campEmail:"",
      campPhone:"",
      campAddress:"",
      selectRole:0
    }
  }
 render(){
   //let userId = 0;
   //let userId = this.props.match.params.employeeId;
   return (
    <div className="container">
      <h3 className="form-row  justify-content-center">Student Information</h3>
    <div className="form-row justify-content-center">
      <div className="form-group col-md-8">
        <label for="inputPassword4">Student Name </label>
        <input type="text" class="form-control"  placeholder="Name" value={this.state.campName} onChange={(value)=> this.setState({campName:value.target.value})}/>
      </div>
      <div class="form-group col-md-8">
        <label for="inputEmail4">Parent Email</label>
        <input type="email" className="form-control"  placeholder="Email" value={this.state.campEmail} onChange={(value)=> this.setState({campEmail:value.target.value})}/>
      </div>
    </div>
    <div class="form-row justify-content-center">
      <div class="form-group col-md-8">
        <label for="inputState">Grade</label>
        <select id="inputState" className="form-control" onChange={(value)=> this.setState({selectRole:value.target.value})}>
          <option selected>Choose...</option>
          <option value="1">First</option>
          <option value="2">Second</option>
          <option value="3">Third</option>
        </select>
      </div>
      <div class="form-group col-md-8">
        <label for="inputEmail4">Phone</label>
        <input type="number" className="form-control"  placeholder="Phone"  value={this.state.campPhone} onChange={(value)=> this.setState({campPhone:value.target.value})}/>
      </div>
    
    <div class="form-group col-md-8">
      <label for="inputAddress">Address</label>
      <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.campAddress} onChange={(value)=> this.setState({campAddress:value.target.value})}/>
    </div>
    </div>
    <div  className="form-row  justify-content-center">
    <button type="submit" className="btn-large btn-primary" onClick={()=>this.sendSave()}> Save Details</button>
    </div>
  </div>
   );
 }
 sendSave(){

  if (this.state.selectRole==0) {
    alert("Enter Role")
  }
  else if (this.state.campPhone=="") {
     alert("Enter Tel phone no")
  }
  else if (this.state.campName=="") {
     alert("Enter name")
  }
  else if (this.state.campEmail=="") {
     alert("Enter email")
  }
  else if (this.state.campAddress=="") {
     alert("Enter Address")
  }
  else {

    //const baseUrl = "http://localhost:3002/student/create"
const {history}=this.props;
    const datapost = {
      name : this.state.campName,
      email : this.state.campEmail,
      phone : this.state.campPhone,
      address : this.state.campAddress,
      role  : this.state.selectRole
    }

    axios.post('http://localhost:3002/student/create',datapost)
    .then(response=>{
      if (response.data.success===true) {
      history.push('/');
        alert("Record stored")
       
      }
      else {
        alert(response.data.message)
      }
    }).catch(error=>{
      alert("Error 34 "+error)
    })

  }

}

}
 



export default EditComponent;