const express = require('express');
const mongoose = require('mongoose');
const devuser=require('./devusermodel');
const reviewmodel=require('./reviewmodel');
const cors=require('cors');
 
const app = express();

const PORT = 8080;

const jwt = require('jsonwebtoken');
const { exit } = require('process');
const middleware = require('./middleware');

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
  });

app.use(express.json());
app.use(cors({origin:'*'}))

app.get('/', (req, res) => {
    res.status(200).send("Hello Get");
})

app.post('/register',async(req,res)=>{
    try{
        // const all=await devuser.find();
        //  console.log(all);
       
        const {fullname,email,mobile,skill,password,confirmpassword}=req.body;
        console.log({fullname,email,mobile,skill,password,confirmpassword})
        // const exist =await devuser.findOne({email});
      
        // if(exist){
        //     return res.status(400).send('user already exsits')
        // }
        // if(password != confirmpassword){
        //     return res.status(401).send('password invalid');
        // }
        // let newUser = new devuser({
        //     fullname,email,mobile,skill,password,confirmpassword
        // })
        //  await newUser.save();
        //  const all=await devuser.find();
        //  console.log(all);

        // return res.status(200).send('user registered')

    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }

})

app.post('/login', async (req, res) => {
    try{
        const {email, password} = req.body;
        const exists = await devuser.findOne({email});
        if(!exists){
            return res.status(402).send('USer not found')
        }
        else{
            if(password != exists.password){
                return res.status(403).send("Password Invalid")
            }
        }
        let payload = {
            user : {
                id : exists.id
            }
        }
        jwt.sign(payload, 'jwtPassword', {expiresIn : 360000000},
         (err, token) => {
            if(err) throw(err);
            return res.json({token});
         })
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/allprofiles',middleware, async (req, res) => {
    try{
        let allProfiles = await devuser.find();
        return res.json(allProfiles);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myprofile', middleware, async (req, res) => {
    try{
        const user = await devuser.findById(req.user.id);
        console.log(user);
        return res.json(user)
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})
app.post('/addreview',middleware,async(req,res)=>{
    try{
        const {taskworker,rating}=req.body;
        const exist =await devuser.findById(req.user.id);
        const newReview =new reviewmodel({
            taskprovider:exist.fullname,
            taskworker,
            rating
        })
        //fetch all collection documets
          const allUsers=await reviewmodel.find();
          // console.log(allUsers);

       await newReview.save().then(console.log(newReview))
       return res.status(200).send('review updated successfully');
    }
    catch(err){
        console.log(err);
        return res.status(500).send('Server Error')
    }
})

app.get('/myreview',middleware,async(req,res)=>{
    try{
        let allreviews = await reviewmodel.find();
        let myreviews = allreviews.filter(review =>
            review.taskworker.toString() === req.user.id.toString())
        return res.status(200).json(myreviews);
    }
    catch(err){
        console.log(err);
        return res.status(500).send('review error')
    }

})

   

mongoose.connect('mongodb+srv://bandiujwalsai:abcd1234@cluster0.imqzq2c.mongodb.net/?retryWrites=true&w=majority').then(
    () => console.log("DB connected")
)
app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
});