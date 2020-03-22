import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import axios from 'axios';
import {Link} from "react-router-dom";
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

class listComponent extends React.Component  {
  constructor(props){
      super(props);
      this.state={
          listStudent:[]
      }
  }
  componentDidMount(){
    //const url="http://localhost:3002/student/list"
     this.loadFillData();
    
  }
 
   render()
  {
    return (
      <table class=" table table-hover table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Role</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Address</th>
            <th scope="col">Phone</th>
            <th colspan="2">Action</th>
          </tr>
        </thead>
        <tbody>         
          {this.loadFillData()}
        </tbody>
      </table>
    );
  }

  loadFillData(){
    axios.get('http://localhost:3002/student/list')
      .then(res=>{
          if(res.data.success){
              const data=res.data.data
              this.setState({listStudent:data})
          }
          else{
              alert("Error")
          }
      })
      .catch(error=>{
          alert("Error"+error)
      });

      return this.state.listStudent.map((data)=>{
          return(
          <tr>
          <th>{data.id}</th>
          <td>{data.role.role}</td>
          <td>{data.name}</td>
          <td>{data.email}</td>
          <td>{data.address}</td>
          <td>{data.phone}</td>
            <td>
             <Link class="btn btn-outline-info " to={"/edit/"+data.id}> Edit </Link>
             
            </td>
            <td>
            <button class="btn btn-outline-danger" onClick={()=>this.onDelete(data.id)}> Delete </button>
            </td>
          </tr>
          )
      })
  }

  onDelete(id){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this npm startfile!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.sendDelete(id)
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Data is not deleted :)',
          'error'
        )
      }
    })
  }

  sendDelete(userId)
  {
    const {history}=this.props;
    // url de backend
    const baseUrl = "http://localhost:3002/student/delete"    // parameter data post
    // network
    axios.post(baseUrl,{
      id:userId
    })
    .then(response =>{
      if (response.data.success) {
    // this.props.loadFillData();
        Swal.fire(
          'Deleted!',
          'Student data has been deleted.',
          'success'
        )
        
      }
    })
    .catch ( error => {
      alert("Error 325 ")
    })
  }
}

export default listComponent;
