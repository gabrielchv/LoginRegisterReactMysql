const express = require('express')
const cookieParser = require("cookie-parser")
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const url = require('url');
const mysql = require('mysql')

app.use(express.static(path.join(__dirname, 'frontend/build')))
app.use(bodyParser.json())
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "loginapp",
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"))
})
app.get('/main', (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/build", "index.html"), { data: JSON.stringify({msg: "data"}) })
})

// redirect

// login
app.post('/api/login', (req, res) => {
  console.log(req.body.password)
  console.log(req.body.username)
  if (req.body.password <= 3 && req.body.password >= 32 && req.body.username <= 3 && req.body.username >= 32){
    console.log("nao foi");
    res.send({
      status: false,
      msg: "Preencha os campos corretamente"
    })
  }
  else{
    console.log("foi");
    db.query("SELECT * FROM `users` WHERE username = '" + req.body.username + "'", (err, rows) => {
      if (Object.keys(rows).length > 0){
        if (rows[0].password == req.body.password){
          // Delete old Cookies
          db.query("UPDATE users SET sessionid = '' WHERE sessionid = '" + req.cookies.sessionid + "'")
          // Add Cookie
          db.query("UPDATE users SET sessionid = '" + req.cookies.sessionid + "' WHERE username = '" + req.body.username + "'")
          res.send({
            status: true,
            msg: "Usuário logado"
          })
        }
        else{
          res.send({
            status: false,
            msg: "Senha incorreta"
          })
        }
      }
      else{
        res.send({
          status: false,
          msg: "Usuário não existe"
        })
      }
    });
  }
})

// register
app.post('/api/register', (req, res) => {
  db.query("SELECT * FROM `users` WHERE username = '" + req.body.username + "'", (err, rows) => {
    if (Object.keys(rows).length == 0){
      db.query("INSERT INTO users(username, password, sessionid) VALUES('" + req.body.username + "', '" + req.body.password + "', '"+req.cookies.sessionid+"')")
      res.send({
        status: true,
        msg: "Usuário criado"
      })
    }
    else{
      res.send({
        status: false,
        msg: "Usuário já existente"
      })
    }
  })
})
app.get('/api/logincookie', (req, res) => {
  db.query("SELECT * FROM `users` WHERE sessionid = '" + req.cookies.sessionid + "'", (err, rows) => {
    if (Object.keys(rows).length > 0){
      res.send(rows[0]);
    }
    else{
      res.send("Não Existe" + req.cookies.sessionid);
    }
  })
})

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port 8000`)
})