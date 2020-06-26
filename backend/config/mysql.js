const mysql=require('mysql');
const connection=mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'db_clinica'
});
connection.connect(function(error){
  if(!!error){
    console.log(error);
  }else{
    console.log('Connected to mySQL');
  }
});  
module.exports = connection; 