const express = require("express");
const path = require("path");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));  //app.use ethukku enna vela paakuthu
app.use(express.json());

app.use("/", require("./routes/viewRoutes"));  
app.use("/api", require("./routes/apiRoutes"));

const PORT = 2005;

app.listen(PORT, (error) => {
    if(error) {
        console.log(error)
        return
    }
    console.log(`Server Running http://localhost:${PORT}`); // server running nu kudukka theva illaya 
});