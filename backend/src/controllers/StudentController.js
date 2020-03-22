const controllers={};

var sequelize=require('../modal/database');
var Student=require('../modal/Student');
var Role=require('../modal/Role');

/*controllers.testdata=async (req,res)=>{
    const response=await sequelize.sync()
    .then(function (){

    Role.create({
        role:'Admin'
    }) 
    Student.create({
        name:'Narayani',
        email:'Narayani@gmail.com',
        address:'123,west street',
        phone:'128889',
        roleId:1
    })   
    const data=Student.findAll();
    return data;
    })
    .catch(error=>{
        return error;
    });      
     res.json({success:true,data:response});

    
}*/
sequelize.sync()

//list students
controllers.list=async(req,res)=>{
    const data=await Student.findAll(
        {
            include:[Role]
        }
    )
    .then(function(data){
        return data;
    })
    .catch(error=>{
        return error;
    })
    res.json({success:true,data:data});
}

//create students
controllers.create=async(req,res)=>{
    const { name, email, address, phone, role } = req.body;
    const data=await Student.create(
        {
    name: name,
    email: email,
    address: address,
    phone: phone,
    roleId: role
        }
    )
    .then(function(data){
        
        return data;
    })
    .catch(error=>{
        return error;
    })
   
    res.status(200).json({success:true,data:data});
}


controllers.get=async(req,res)=>{
   const { id }=req.params;
    const data=await Student.findAll(
        {   
            where: {id:id},
            include:[Role]
        }
    )
    .then(function(data){
        return data;
    })
    .catch(error=>{
        return error;
    })
    res.json({success:true,data:data});
}


//Update students
controllers.update=async(req,res)=>{
    const { id } = req.params;
    const { name, email, address, phone, role } = req.body;
    const data=await Student.update(
    {
    name: name,
    email: email,
    address: address,
    phone: phone,
    roleId: role
    },
    {
     where:{id:id}
    }
    )
    .then(function(data){
        return data;
        
    })
    .catch(error=>{
        return error;
    })
    res.status(200).json({success:true,messgae:"Updated",data:data});
}

//delete
controllers.delete = async (req, res) => {
    // parameter post
    const { id } = req.body;
    // delete sequelize
    const del = await Student.destroy({
      where: { id: id}
    })
    res.json({success:true,deleted:del,message:"Deleted successful"});
  }

module.exports=controllers;