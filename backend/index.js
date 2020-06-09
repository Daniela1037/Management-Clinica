const Router = require('./src/Router')
const express = require ('express')
const cors = require ('cors')
const bodyParser = require("body-parser")
const app = express();
app.use(bodyParser())
app.use(cors())
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(Router)
app.listen(5000, () => {
 console.log("Server running on port 5000");
});