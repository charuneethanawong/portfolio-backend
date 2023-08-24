const express = require('express')
const cors = require('cors')
const app = express()
const mysql = require('mysql')
require('dotenv').config()

const connection = mysql.createConnection(process.env.DATABASE_URL)
    // host: 'localhost',
    // user: 'root',
    // password: '123456',
    // database: 'portfolio',
    
    app.use(cors())
    app.use(express.json())

connection.connect((err)=>{
    if(err){
        console.log('error connecting =',err);
        return
    }
    console.log('mysql successfully connected');
})

app.get('/users',(req,res)=>{
    connection.query("SELECT * FROM project",(err,result)=>{
        if (err)console.log(err)
        else{res.send(result)}
})
})

app.post('/adddata',(req,res)=>{
   const {firstName,lastName,age} = req.body
    connection.query("INSERT INTO project (firstname, lastname, age) VALUES(?,?,?)",
    [firstName,lastName,age]
    ,(err,result)=>{
        if (err)console.log(err)
        else{res.send('data was added')}
})
})

app.put('/updatedata/:id',(req,res)=>{
    const id = req.params.id
    const {firstName,lastName,age} = req.body
    connection.query("UPDATE project SET firstname=?, lastname=?, age=? WHERE id =?",
    [firstName,lastName,age,id]
    ,(err,result)=>{
        if (err)console.log(err)
        else{res.send('updated successfully')}
})
})
app.delete('/deletedata/:id',(req,res)=>{
    const id = req.params.id
    connection.query("DELETE FROM project WHERE id =?",
    [id]
    ,(err,result)=>{
        if (err)console.log(err)
        else{res.send('deleted successfully')}
})
})
app.listen(process.env.PORT || 3333,()=>{console.log('server is running 3333');})
