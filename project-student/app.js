const express = require("express");
const path = require("path");
const session = require("express-session");
const cookieParser = require("cookie-parser");


const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 86400000
        httpOnly: true
    }
}));

app.use((req, res, next) => {

    const publicRoutes = [
        "/login",
        "/api/student/login",
    ];

    if (publicRoutes.includes(req.path)) {
        return next();
    }

    if (req.session.studentId) {
        return next();
    }

    res.status(401).json({message: "unauthorised request"});
});

app.use("/", require("./routes/viewRoutes"));
app.use("/api", require("./routes/apiRoutes"));

const PORT = 2005;

app.listen(PORT, () => {
    console.log(`Server Running http://localhost:${PORT}`);
});