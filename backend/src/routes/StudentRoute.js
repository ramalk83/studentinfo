const express=require('express');
const router=express.Router();
const studentController=require('../controllers/StudentController');

//router.get('/datatest',studentController.testdata);

/*router.get('/save',(req,res)=>{
    res.json({status:"student saved"});
    res.send("student");
})*/

router.get('/list',studentController.list);
router.post('/create',studentController.create);
router.get('/get/:id',studentController.get);
router.post('/update/:id',studentController.update);
router.post('/delete',studentController.delete);

module.exports=router;