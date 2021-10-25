if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const bcrypt= require('bcrypt');
const stripe = require('stripe');

const passport = require('passport');
const flash = require ('express-flash');
const session = require ('express-session');
const methodOverride = require('method-override');

const User=require('./models/userModel');
const Order=require('./models/orderModel');

const initializePassport = require('./passport-config');
const bodyParser = require('body-parser');
initializePassport(
  passport, 
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
const users = []

dotenv.config({ path: './.env'});

const app = express();

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.use(favicon(path.join(__dirname, './public/favicon.ico')));
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false, 
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.set('view engine', 'hbs');

var fs = require('fs');
var hbs = require('hbs');
hbs.registerPartial('messages', fs.readFileSync(__dirname + '/views/partials/messages.hbs', 'utf8'));

const dbUrl = process.env.DB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log('MongoDB is connected');
  } catch (error) {
    console.log('Error connecting to Database');
  }
}

connectDB();

app.use('/', require('./site_13.09/routes/pages'));
app.use('/products', require('./site_13.09/routes/products'));
app.use('/checkout', require('./site_13.09/routes/checkout'));
app.use('/landing', require('./site_13.09/routes/landing'));

app.listen(5000, () => {
  console.log("Server is running on port 5000");
})

app.post('/registo', async (req,res) =>{
  let errors=[];
  const hashedPassword= await bcrypt.hash(req.body.password, 10);
  const {name, email, password, password2 } = req.body;
  User.findOne({email: email})
  .then (utilizador => {
    //email já existe
    if(utilizador){
      //Messagem de erro
      errors.push({msg:' Email já se encontra registado.'});
      console.log(errors[0])
      res.render('registo',{errors});      
      //Login -> Dashboard
      // res.redirect('/registo')    
    }
    // email não existe
    else{
      // registo de novo utilizador com hashed password
      const newUser = new User({
      // id: Date.now().toString(),
      name: name,
      email: email,
      password: hashedPassword
      })
      console.log("teste1")
      console.log(newUser)
      newUser.save()
      .then(utilizador => {
         res.redirect('/login')
        console.log("teste2")
      })
      .catch(err => console.log(err));
    }
  })

  app.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/')
  })

  function checkNotAuth (req, res, next){
    if(req.isAuthenticated()){
      return res.redirect('/user')
    }
    next()
  }

console.log(users)
// app.post('/login', passport.authenticate('local',{
//   successRedirect: '/user',
//   failureRedirect: '/login',
//   failureFlash: true
// }))




});

app.post('/login',  async (req,res) =>{
  const {name, email, password, password2 } = req.body;
  User.findOne({email: email})
  .then (utilizador => {
  if (utilizador){
    console.log("teste3")
   return  res.redirect('/homepage')
  }
  else{ 
    console.log("teste4")
    res.redirect('/login')
  }
  })
})

// app.post('/login', passport.authenticate('local',{
//   successRedirect: '/user',
//   failureRedirect: '/login',
//   failureFlash: true
// }))

// app.post('/registo', async (req,res) =>{
//   try{
//     const hashedPassword= await bcrypt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     res.redirect('/login')
//   } catch {
//     res.redirect('/registo')
//   }

//   app.delete('/logout',(req,res)=>{
//     req.logOut()
//     res.redirect('/')
//   })

//    function checkNotAuth (req, res, next){
//     if(req.isAuthenticated()){
//       return res.redirect('/user')
//     }
//     next()
//   }

// console.log(users)
// })


//pagar


app.post('https://formsubmit.co/goldenumber@outlook.pt', async (req,res) =>{
  try {
    const productsFromFrontend = req.body.products;
    function productsToBuy() {
      let products = [];
      
      productList.forEach( singleProductList => {
        productsFromFrontend.forEach(singleProductFrontend => {
          if( singleProductList.tag === singleProductFrontend.tag ) {
            if (singleProductFrontend.inCart===4){
            products.push({
              name: singleProductList.name,
              amount: (singleProductList.price-0.25) * 100,
              currency: 'eur',
              quantity: singleProductFrontend.inCart
            })
            } 
            else if (singleProductFrontend.inCart>4 & singleProductFrontend.inCart<8){
              products.push({
                name: singleProductList.name,
                amount: Math.round(((singleProductList.price*(singleProductFrontend.inCart-4))/singleProductFrontend.inCart+(4/singleProductFrontend.inCart)*(singleProductList.price-0.25)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart==8){
              products.push({
                name: singleProductList.name,
                amount: Math.round((singleProductList.price-0.5) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart>8 & singleProductFrontend.inCart<12){
              products.push({
                name: singleProductList.name,
                amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(8/singleProductFrontend.inCart)*(singleProductList.price-0.5)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if ( singleProductFrontend.inCart==12){
              products.push({
                name: singleProductList.name,
                amount: Math.round((singleProductList.price-0.75) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              
            else if (singleProductFrontend.inCart>12 & singleProductFrontend.inCart<16){
              products.push({
                name: singleProductList.name,
                amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(12/singleProductFrontend.inCart)*(singleProductList.price-0.75)) * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
              } 
              else if (singleProductFrontend.inCart==16){
                products.push({
                  name: singleProductList.name,
                  amount: Math.round((singleProductList.price-1) * 100),
                  currency: 'eur',
                  quantity: singleProductFrontend.inCart
                })
                } 
                else if (singleProductFrontend.inCart>16 & singleProductFrontend.inCart<=20){
                  products.push({
                    name: singleProductList.name,
                    amount: Math.round((singleProductList.price/singleProductFrontend.inCart+(16/singleProductFrontend.inCart)*(singleProductList.price-1)) * 100),
                    currency: 'eur',
                    quantity: singleProductFrontend.inCart
                  })
                  }
            else {
              products.push({
                name: singleProductList.name,
                amount: Math.round(singleProductList.price * 100),
                currency: 'eur',
                quantity: singleProductFrontend.inCart
              })
            }
          }
        })
      })
    
      return products
    }
  const {name, email} = req.body;
  session_item=productsToBuy()
  console.log("testeProductstoBuy")
  console.log(session_item)
    const purchasedProducts = session_item.map(product=>(
      {
        productName: product.name,
        price: product.amount_total / 100,
        quantity: product.quantity
      }))
  await Order.create(
    {
    userName: name,
    userEmail: email,
    products: purchasedProducts,
      totalPrice: session.amount_total / 100
    })
    console.log("testeorder")
} catch (error) {
  console.log(error);
}
});


