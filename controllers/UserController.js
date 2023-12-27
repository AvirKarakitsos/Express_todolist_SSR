const path = require('path');
const fsPromises = require('fs').promises;
const data = {
    users : require('../model/db.json'),
    setUsers : function(data) { this.users = data}
};


const index = (req,res) => {
    res.sendFile(path.join(__dirname,'..','views','index.html'));
}

const store = async (req,res) => {
    try{
        const newUser = {
            id: data.users.length === 0 ? 1 : data.users[data.users.length-1].id + 1,
            task: req.body.task,
            date: new Date(),
            update: new Date()
        }
    
        data.setUsers([...data.users,newUser]);
    
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','db.json'),
            JSON.stringify(data.users,null,2)
        )
        res.redirect('/');

    }catch(err){
        res.status(500).json({'message ': err.message});
    }
}

const updated = async (req,res) => {
    try{
        const user = data.users.find(input => input.id === parseInt(req.params.id));
       
        user.task = req.body.task;
        user.update = new Date();

        const filterArray = data.users.filter(input => input.id !== parseInt(req.params.id));
        const unsortedArray = [...filterArray,user];
        data.setUsers(unsortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    
        await fsPromises.writeFile(
            path.join(__dirname,'..','model','db.json'),
            JSON.stringify(data.users,null,2)
        )
        res.redirect('/');

    }catch(err){
        res.status(500).json({'message ': err.message});
    }
}

const deleted = async (req, res) => {
    try{
        const filterArray = data.users.filter(input => input.id !== parseInt(req.params.id));
        data.setUsers(filterArray);

        await fsPromises.writeFile(
            path.join(__dirname,'..','model','db.Json'),
            JSON.stringify(data.users,null,2)
        )
        res.redirect('/');

    }catch(err){
        res.status(500).json({'message ': err.message});
    }
}

module.exports = { index, store, updated, deleted};
