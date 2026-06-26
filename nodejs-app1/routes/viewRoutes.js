const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.get("/", (req, res) => {
    res.render("home");
});

router.get("/customer/create", (req, res) => {
    res.render("customerCreateForm");
});

router.get("/customers", (req, res) => {
    res.render("customerList");
});

router.get("/customer/edit", (req, res) => {
    res.render("customerEdit");
});

router.get("/customer/update/:id", (req, res) => {
    res.render("/customers");
});

module.exports = router;