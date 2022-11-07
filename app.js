if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
const express = require("express");
const {connect} = require("./config/db");
const {router} = require("./routes");
const errorHandler = require("./middlewares/errorHandler.js")
const cors = require("cors")
const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));

app.use(router)
app.use(errorHandler)

connect().then(() => app.listen(port, () => console.log('Listening on port:', port)))
