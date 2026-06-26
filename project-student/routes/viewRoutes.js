const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/student/create", (req, res) => {
    res.render("studentCreateForm");
});

router.get("/students", (req, res) => {
    res.render("studentList");
});

router.get("/student/edit", (req, res) => {
    res.render("studentEdit");
});

router.get("/student/update/:id", (req, res) => {
    res.render("/students")
})

module.exports = router;