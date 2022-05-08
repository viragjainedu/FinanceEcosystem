var express = require('express');
var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'finance'
})

// var connection = mysql.createConnection({
//   host: 'sql6.freemysqlhosting.net',
//   user: 'sql6490854',
//   password: 'zPHFV1wIaX',
//   database: 'sql6490854'
// })

connection.connect()

module.exports = connection;
