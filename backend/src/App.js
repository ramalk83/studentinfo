const express=require('express');
const app=express();

app.set('port',process.env.PORT||3002);
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
const studentRouters=require('./routes/StudentRoute');
app.use('/student',studentRouters)

app.use('/',(req,res)=>{
    res.send("Hello world");
});
app.listen(app.get('port'),()=>{
console.log("server")
})