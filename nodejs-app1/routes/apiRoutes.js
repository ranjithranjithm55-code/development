const express = require("express");
const router = express.Router();  // ithu express oda oru future ah 

const db = require("../config/db");

const UPDATE_CUSTOMER_QUERY = `
    UPDATE customerinfo
    SET customerName = ?,
        phoneNumber = ?,
        dob = ?,
        bloodGroup = ?
    WHERE customerId = ?
`;

router.get("/customer", (req, res) => {

    db.query(
        "SELECT * FROM customerinfo",
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result);
        }
    );
});

router.get("/customer/:id", (req, res) => {

    db.query(
        "SELECT * FROM customerinfo WHERE customerId=?",
        [req.params.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(result[0]);
        }
    );
});

router.post("/customer", (req, res) => {

    const data = req.body;

    db.query(
        `INSERT INTO customerinfo
        (customerName, phoneNumber, dob, bloodGroup)
        VALUES (?, ?, ?, ?)`,
        [
            data.customerName,
            data.phoneNumber,
            data.dob,
            data.bloodGroup
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Created",
                customerId: result.insertId
            });
        }
    );
});

router.put("/customer/:id", (req, res) => {

    const id = req.params.id;

    const {
        customerName,
        phoneNumber,
        dob,
        bloodGroup
    } = req.body;

    db.query(
        `UPDATE customerinfo
         SET customerName = ?,
             phoneNumber = ?,
             dob = ?,
             bloodGroup = ?
         WHERE customerId = ?`,
        [customerName, phoneNumber, dob, bloodGroup, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    message: "Database Error"
                });
            }

            res.json({
                message: "Customer Updated Successfully"
            });

        }
    );

});

router.delete("/customer/:id", (req, res) => {

    db.query(
        "DELETE FROM customerinfo WHERE customerId=?",
        [req.params.id],
        (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: "Customer Deleted"
            });
        }
    );
});

module.exports = router;