const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo')(expressSession);
const passport = require('passport');
const LocalStrategy = require('passport-local');
const cors = require('cors');
const bodyParser = require('body-parser');
const Config = require('./DataBase/Urldb');
const ProductsRouter = require('./routes/Products');
const CategorieRouter = require('./routes/Categories');
const Orders = require('./routes/Orders');
const UsersRouter = require('./routes/Users');
const User = require('./models/Users');
const app = express();
const Port = process.env.PORT || 3000;

mongoose.connect(Config.DB)
.then(
    ()=>{console.log('DataBase is connected')}
)
.catch(
    err =>{console.log('Can not connect to the database'+ err)}
);

app.use(cors());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
// enable session management
app.use(
    expressSession({
      secret: "konexioasso07",
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection })
    })
);
// enable Passport
app.use(passport.initialize());
app.use(passport.session());
// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); // JSON.stringify
passport.deserializeUser(User.deserializeUser()); // JSON.parse

app.get("/",(req, res) => {
    const user = req.user || {};
    res.json({
      isAuthenticated: req.isAuthenticated(),
      user: user
    });
});

app.use('/products', ProductsRouter);
app.use('/categories', CategorieRouter);
app.use('/orders', Orders);
app.use('/users', UsersRouter);

app.listen(Port, ()=>{
    console.log('Server connected : ', Port);
})