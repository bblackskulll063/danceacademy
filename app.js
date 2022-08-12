const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");

const mongoose = require('mongoose');

const db='mongodb+srv://mydanceacademy:1234567890@cluster0.h63yxze.mongodb.net/danceacademy?retryWrites=true&w=majority';

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(db);
}

const contactschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    desc: String
});


const contactus = mongoose.model('contactus', contactschema);

// EXPRESS SPECIFIC STUFF
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use('/static', express.static('static')) // For serving static files
// app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')  // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))  // Set the views directory


//   END POINT 
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})


app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact',(req,res)=>{
    var mydata= new contactus(req.body);
    mydata.save().then(()=>{
        res.send("This item has been saved to the database");
    }).catch(()=>{
        res.status(400).send("Item was not saved yet into the database");
    });
})

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`)
})