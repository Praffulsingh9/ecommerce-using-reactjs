const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

//Models

const { User } = require("./models/user");

//Middlewares

const { auth } = require("./middleware/auth");

//==================================
//        Users
//==================================

//AUTH ROUTE

app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});

//REGISTER USER
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true
    });
  });
});

//LOGIN USER
app.post("/api/users/login", (req, res) => {
  //prettier-ignore
  User.findOne({ 'email': req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSucess: false,
        message: "Auth fails,email not found"
      });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSucess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        //prettier-ignore
        res.cookie('w_auth', user.token,{httpOnly:false}).status(200).json({ loginSucess: true });
      });
    });
  });
});

const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});
