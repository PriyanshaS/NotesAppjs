const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Note = require('./models/Note');
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
mongoose.connect('mongodb+srv://Priyansha:ps123456@cluster0.liennbj.mongodb.net/tododb').then(
    function(){
        app.get("/" ,function(req, res){
             const response = {statuscode: res.statuscode , message:"Welcome to homepage"}
            res.send(response);
        } );
        
        app.post("/notes/add" , async function(req,res){

           await Note.deleteOne({id:req.body.id});

            const notes = new Note({
                id:req.body.id,
                title:req.body.title,
                user_id:req.body.user_id,
                content:req.body.content,
            });
           await notes.save();
           res.send('Welcome to notes/ad page');
        });
        app.post("/notes/userid" , async function(req,res){
            var note = await Note.find({user_id:req.body.user_id});
            res.json(note);
       });
        app.get("/notes" , async function(req,res){
            var note = await Note.find();
            res.json(note);
       });
       app.post("/notes/delete" , async function(req,res){
         await Note.deleteOne({id:req.body.id});
         res.send("Deleted");
       })
    }
)
const PORT = process.env.PORT || 5000;
app.listen(PORT , function(){
    console.log("Started at port "+PORT);
});
