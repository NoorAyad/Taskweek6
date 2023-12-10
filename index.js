const { NOTFOUND } = require("dns");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());

const data = fs.readFileSync("./users.json", "utf8");
const users = JSON.parse(data);

app.get("/users", (req, res) => {
  res.send(users);
});

app.get("/users/:id", (req, res) => {
  //get user by id
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  res.send(user);
});

app.get("/FirstUser", (req, res) => {
  //TODO: get first user
  let user = users[0];
  res.send(user);
});

app.get("/LastUser", (req, res) => {
  //TODO: get last user
  let user = users[users.length - 1];
  res.send(user);
});

app.get("/UserByCompanyName/:companyName", (req, res) => {
  //TODO: get user by company name
  let company = req.params.companyName;
  let user = users.find((el) => el.company.name === company);
  res.send(user);
});

app.get("/UserByCity/:city", (req, res) => {
  //TODO : get user by city
  let city = req.params.city;
  let user = users.find((el) => el.address.city === city);
  res.send(user);
});

app.get("/UserStreet/:id", (req, res) => {
  //TODO: get street name by userID
  let id = req.params.id;
  let user = users.find((el) => el.id === parseInt(id));
  let street =user.address.street;
  // note  for me street should return to front as json  
  res.send({street});
});

app.post("/AddUser", (req, res) => {
  //add new user
  let name = req.body.name;
  let age = req.body.age;

  let newUser = { name, age };
  users.push(newUser);

  //save new users list in file  which include the new user
  fs.writeFileSync("./users.json", JSON.stringify(users));
  res.send({ success: true });
});



app.get("/UpdUser/:id", (req, res) => {
  let id = req.params.id;
   //TODO: update email when id === userID (my old work on task1)
   //TODO : add update function
   let user = users.find(el => el.id === parseInt(id));
   user.email = GenerateEmail();
   fs.writeFileSync("./users.json", JSON.stringify(users));
   res.send({success:true});
  });
  
  const GenerateEmail = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let string = '';
    for (let ii = 0; ii < 15; ii++) {
      string += chars[Math.floor(Math.random() * chars.length)];
    }
    return string + "@gmail.com";
  }
  
  app.delete("/deleteUserById/:id", (req, res) => {
    //TODO : add delete function
    let id = req.params.id*1 ; 
    let user=users.find(el=>el.id ===id);
    if (!user)
     res.send({ messag:NOTFOUND})
    let users1 = users.filter((el) => el.id != id);
    fs.writeFileSync("./users.json", JSON.stringify(users1));
    res.send({ success: true });
  
     
  });
  
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
  