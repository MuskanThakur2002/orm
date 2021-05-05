const setup_db=require("./app")
const express=require("express")
const { Person } = require('./models/persons');
setup_db()
const app=express()
app.use(express.json())

app.get('/user',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User= await Person.query();
    res.json({User})
    }catch (err){
    console.error(err)
    }
})

app.get('/user/:id',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User= await Person.query().findById(id);
    res.json({User})
    }catch (err){
    console.error(err)
    }
})

app.post('/create',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User= await Person.query().insert({
        id:req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age:req.body.age
      });
        res.json({User})
    }catch (err){
    console.error(err)
    }
})



app.post('/create',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User= await Person.query().insert({
        id:4,
        firstName: 'manisha',
        lastName: 'khan',
        age:25
      });
        res.json({User})
    }catch (err){
    console.error(err)
    }
})

app.put('/update/:id',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User = await Person.query()
    .findById(id)
    .patch({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age:req.body.age
    });
    res.json({User})
    }catch (err){
    console.error(err)
    }
})  



app.delete('/delete/:id',async (req,res,next)=>{
    try{
    const { id }=req.params
    const User= await Person.query().deleteById(id);
    res.json("deleted")
    }catch (err){
    console.error(err)
    }
})  



app.listen(8080,()=>{
    console.log("got it")
})

