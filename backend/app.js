var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
const { spawn } = require('child_process');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var database = require("./routes/database");
var login = require("./routes/login");
var advanceInsights = require("./routes/advanceInsights");
var blogs = require("./routes/blogs");
var borrowing = require("./routes/borrowing");
// var budgetPlanner = require("./routes/budgetPlanner");
// var decentralizedLoan = require("./routes/decentralizedLoan");
// var documentVerficiation = require("./routes/documentVerficiation");
// var intraBankTransaction = require("./routes/intraBankTransaction");
var investmentAdvisor = require("./routes/investmentAdvisor");
var news = require("./routes/news");
var p2pLending = require("./routes/p2pLending");
var register = require("./routes/register");
var ForgotPassword = require("./routes/ForgotPassword");
var searchResult = require("./routes/searchResult");
var sendOTP = require("./routes/sendOTP");
var account_stats = require("./routes/account_stats");
var interests = require("./routes/interests");
var installments = require("./routes/installments");
var myProfile = require("./routes/myProfile");
var faqs = require("./routes/faqs");

var Fico = require("./routes/Fico");
var withdrawal = require("./routes/withdrawal");

var SystemNotifications = require("./routesAdmin/SystemNotifications");
var Mails = require("./routesAdmin/Mails");
var AddRemoveBlogs = require('./routesAdmin/AddRemoveBlogs');
var LoanDefault = require('./routesAdmin/LoanDefault');
var LoanCompleted = require('./routesAdmin/LoanCompleted');

var app = express();
const jwt = require('jsonwebtoken');

// for node cron tasks
require('./tasks/tasks')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/testAPI", testAPIRouter);
app.use("/database", database);
app.use("/login", login);
app.use("/blogs", blogs);
app.use("/borrowing", borrowing);
// app.use("/budgetPlanner", budgetPlanner);
// app.use("/decentralizedLoan", decentralizedLoan);
// app.use("/documentVerficiation", documentVerficiation);
// app.use("/intraBankTransaction", intraBankTransaction);
app.use("/investmentAdvisor", investmentAdvisor);
app.use("/advanceInsights", advanceInsights);
app.use("/news", news);
app.use("/p2pLending", p2pLending);
app.use("/register", register);
app.use("/ForgotPassword", ForgotPassword);
app.use("/searchResult", searchResult);
app.use("/sendOTP", sendOTP);
app.use("/account_stats", account_stats);
app.use("/installments", installments);
app.use("/interests", interests);
app.use("/myProfile", myProfile);
app.use("/faqs", faqs);

app.use("/Fico", Fico);
app.use("/withdrawal", withdrawal);

app.use("/SystemNotifications", SystemNotifications);
app.use("/AddRemoveBlogs", AddRemoveBlogs);
app.use("/LoanDefault", LoanDefault);
app.use("/LoanCompleted", LoanCompleted);

app.use("/Mails", Mails);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.type('text/plain')
  res.status(500)
  res.send('internal server error')
})

module.exports = app;
