const express = require("express");
const router = express.Router();

const db = require("../config/db");

const UPDATE_TEACHER_QUERY = `
UPDATE teacherinfo
SET teacherName = ?,
    phoneNumber = ?,
    dob = ?,
    email = ?,
    password = ?
    WHERE teacherId = ?
    `;
    
router.post("/teacher/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        `SELECT * FROM teacherinfo
         WHERE email=? AND password=?`,
        [email, password],
        (err, rows) => {

            if (err)
                return res.status(500).json(err);

            if (rows.length === 0) {
                return res.status(401).json({
                    message: "Invalid Email or Password"
                });
            }

            req.session.teacherId = rows[0].teacherId;
            req.session.teacherName = rows[0].teacherName;

            res.json({
                message: "Login Successful"
            });

        });

});

router.post("/teacher", (req, res) => {

    console.log("Request Body:", req.body);

    const {
        teacherName,
        phoneNumber,
        dob,
        email,
        password
    } = req.body;

    // Validation
    if (!teacherName || !phoneNumber || !dob || !email || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }

    db.query(
        `SELECT * FROM teacherinfo
         WHERE email = ? OR phoneNumber = ?`,
        [email, phoneNumber],
        (err, rows) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (rows.length > 0) {

                if (rows.some(row => row.email === email)) {
                    return res.status(400).json({
                        message: "Email already exists"
                    });
                }

                if (rows.some(row => row.phoneNumber === phoneNumber)) {
                    return res.status(400).json({
                        message: "Phone number already exists"
                    });
                }

            }

            db.query(
                `INSERT INTO teacherinfo
                (teacherName, phoneNumber, dob, email, password)
                VALUES (?, ?, ?, ?, ?)`,
                [teacherName, phoneNumber, dob, email, password],
                (err, result) => {

                    if (err) {
                        console.log(err);
                        return res.status(500).json(err);
                    }

                    res.status(201).json({
                        message: "Teacher created successfully",
                        teacherId: result.insertId
                    });

                }
            );

        }
    );

});

router.get("/teacher", (req, res) => {

    db.query(
        "SELECT * FROM teacherinfo",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);
        }
    )
});

router.get("/teacher/:id", (req, res) => {

    db.query(
        "SELECT * FROM teacherinfo WHERE teacherId=?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);
        }
    )
})

router.put("/teacher/:id", (req, res) => {

    const id = req.params.id;

    const { teacherName, phoneNumber, dob, email, password } = req.body;

    db.query(`
    UPDATE teacherinfo
    SET teacherName = ?,
    phoneNumber = ?,
    dob = ?,
    email = ?,
    password = ?
    WHERE teacherId = ?`,
        [teacherName, phoneNumber, dob, email, password, id],
        (err, result) => {

            if (err) {
                console.log(err)

                return res.status(500).json({
                    message: err.sqlmessage
                });
            }

            res.json({
                message: "teacher updated successfully"
            })
        })
})

router.delete("/teacher/:id", (req, res) => {

    db.query(
        "DELETE FROM teacherinfo WHERE teacherId=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "student deleted"
            })
        })
})
router.get("/teacher/logout", (req, res) => {

    req.session.destroy((err) => {

        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            });
        }

        res.clearCookie("connect.sid");

        res.json({
            message: "Logout successful"
        });

    });

});

module.exports = router;