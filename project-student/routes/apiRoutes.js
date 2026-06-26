const express = require("express");
const router = express.Router();

const db = require("../config/db");

const UPDATE_STUDENT_QUREY = `
    UPDATE studentinfo  
    SET studentName = ?,
      phoneNumber = ?,
      dob = ?,
      department = ?,
      email = ?,
      password = ?
    WHERE studentId = ?
`;
router.post("/student/login", (req, res) => {

    const { email, password } = req.body;

    db.query(
        `SELECT * FROM studentinfo WHERE email=?`,
        [email],
        (err, rows) => {

            if (err)
                return res.status(500).json(err);

            if (rows.length === 0) {
                return res.status(401).json({
                    message: "No account found with that email"
                });
            }

            const student = rows[0];

            if (student.password !== password) {
                return res.status(401).json({
                    message: "Incorrect password"
                });
            }

            res.json({
                message: "Login successful",
                student: {
                    id: student.id,
                    studentName: student.studentName,
                    email: student.email,
                    department: student.department
                }
            });
        }
    );
});

router.post("/student", (req, res) => {

    const validDepartments = [
        "B.COM",
        "BBA",
        "B.SC(COMPUTER SCIENCE)",
        "B.SC(IT)"
    ];

    const data = req.body;


    db.query(
        `SELECT * FROM studentinfo
         WHERE email=? OR phoneNumber=? OR password=?`,
        [data.email, data.phoneNumber, data.password],
        (err, rows) => {

            if (err)
                return res.status(500).json(err);

            if (rows.some(row => row.email === data.email)) {
                return res.status(400).json({
                    message: "Email already exists"
                });
            }

            if (rows.some(row => row.phoneNumber === data.phoneNumber)) {
                return res.status(400).json({
                    message: "Phone Number already exists"
                });
            }

            if (rows.some(row => row.password === data.password)) {
                return res.status(400).json({
                    message: "Password already exists"
                });
            }

            db.query(
                `INSERT INTO studentinfo
                (studentName,phoneNumber,dob,department,email,password)
                VALUES(?,?,?,?,?,?)`,
                [
                    data.studentName,
                    data.phoneNumber,
                    data.dob,
                    data.department,
                    data.email,
                    data.password
                ],
                (err, result) => {

                    if (err)
                        return res.status(500).json(err);

                    res.json({
                        message: "Student Created",
                        studentId: result.insertId
                    });
                }
            )
        })
});


router.get("/student", (req, res) => {

    db.query(
        "SELECT * FROM studentinfo",
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result);
        }
    );
});

router.get("/student/:id", (req, res) => {

    db.query(
        "SELECT * FROM studentinfo WHERE studentId=?",
        [req.params.id],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json(result[0]);
        }
    );
});

router.put("/student/:id", (req, res) => {

    const id = req.params.id;

    const { studentName, phoneNumber, dob, department, email, password } = req.body;

    db.query(
        `UPDATE studentinfo
         SET studentName=?,
             phoneNumber=?,
             dob=?,
             department=?,
             email=?,
             password=?
         WHERE studentId=?`,
        [studentName, phoneNumber, dob, department, email, password, id],
        (err, result) => {

            if (err) {
                console.log(err);

                return res.status(500).json({
                    message: err.sqlMessage
                });
            }

            res.json({
                message: "Student Updated successfully"
            });
        }
    );
});

router.delete("/student/:id", (req, res) => {

    db.query(
        "DELETE FROM studentinfo WHERE studentId=?",
        [req.params.id],
        (err) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: "Student Deleted"
            });
        }
    );
});

module.exports = router;