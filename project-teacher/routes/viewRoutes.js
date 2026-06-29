const express = require("express")
const router = express.Router()

const db = require("../config/db")

router.get("/", (req, res) => {
    res.render("home")
})

router.get("/login", (req, res) => {
    res.render("home")
})

router.get("/teacher/create", (req, res) => {
    res.render("teacherCreateForm")
})

router.get("/teacher/result", (req, res) => {
    
    if (!req.session.teacherId) {
        return res.redirect("/")
    }

    res.render("result", {
        teacherName: req.session.teacherName
    })

})

router.get("/teacher/login", (req, res) => {
    res.render("teacherlogin")
})

router.get("/teachers", (req, res) => {
    res.render("teacherList")
})

router.get("/teacher/edit", (req, res) => {
    res.render("teacherEdit")
})

router.get("/teacher/update/:id", (req, res) => {
    res.render("/teachers")
})

module.exports = router;