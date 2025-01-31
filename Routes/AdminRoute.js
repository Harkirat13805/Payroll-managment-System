import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 

router.post('/add_employee',upload.single('image'), (req, res) => {
    const sql = `INSERT INTO employee 
    (name,email,password, address, salary,image, category_id) 
    VALUES (?)`;
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        const values = [
            req.body.name,
            req.body.email,
            hash,
            req.body.address,
            req.body.salary, 
            req.file.filename,
            req.body.category_id
        ]
        con.query(sql, [values], (err, result) => {
            if(err) return res.json({Status: false, Error: err})
            return res.json({Status: true})
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM employee WHERE id = ?";
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
        set name = ?, email = ?, salary = ?, address = ?, category_id = ? 
        Where id = ?`
    const values = [
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ]
    con.query(sql,[...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "delete from employee where id = ?"
    con.query(sql,[id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

// Backend API

router.get('/employee_categories', (req, res) => {
  const sql = "SELECT category.name, COUNT(employee.id) as count FROM employee JOIN category ON employee.category_id = category.id GROUP BY category.name";
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
  });
});


router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})
router.get('/reports', (req, res) => {
  const sql = "SELECT * FROM reports";
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Get a single report by ID
router.get('/report/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM reports WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Add a new report
router.post('/add_report', (req, res) => {
  const { title, description } = req.body;
  const sql = "INSERT INTO reports (title, description) VALUES (?, ?)";
  con.query(sql, [title, description], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Edit an existing report
router.put('/edit_report/:id', (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const sql = "UPDATE reports SET title = ?, description = ? WHERE id = ?";
  con.query(sql, [title, description, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Delete a report
router.delete('/delete_report/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM reports WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});


router.get('/directory', (req, res) => {
  const sql = "SELECT * FROM directory";
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Get a single directory entry by ID
router.get('/directory/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM directory WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Add a new directory entry
router.post('/add_directory', (req, res) => {
  const { DA_DIR, WEF, UPD_BY, UPD_DT } = req.body;
  const sql = "INSERT INTO directory (DA_DIR, WEF, UPD_BY, UPD_DT) VALUES (?, ?, ?, ?)";
  con.query(sql, [DA_DIR, WEF, UPD_BY, UPD_DT], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Edit an existing directory entry
router.put('/edit_directory/:id', (req, res) => {
  const id = req.params.id;
  const { DA_DIR, WEF, UPD_BY, UPD_DT } = req.body;
  const sql = "UPDATE directory SET DA_DIR = ?, WEF = ?, UPD_BY = ?, UPD_DT = ? WHERE id = ?";
  con.query(sql, [DA_DIR, WEF, UPD_BY, UPD_DT, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Delete a directory entry
router.delete('/delete_directory/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM directory WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Get all IT tax slab entries
router.get('/it_tax_slab', (req, res) => {
  const sql = "SELECT * FROM it_tax_slab";
  con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Get a single IT tax slab entry by ID
router.get('/it_tax_slab/:id', (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM it_tax_slab WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
  });
});

// Add a new IT tax slab entry
router.post('/add_it_tax_slab', (req, res) => {
  const { Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by, upd_dt } = req.body;
  const sql = "INSERT INTO it_tax_slab (Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by, upd_dt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  con.query(sql, [Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by, upd_dt], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Edit an existing IT tax slab entry
router.put('/edit_it_tax_slab/:id', (req, res) => {
  const id = req.params.id;
  const { Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by, upd_dt } = req.body;
  const sql = "UPDATE it_tax_slab SET Fin_year = ?, start_of_slab = ?, end_of_slab = ?, percentage = ?, employee_typ = ?, standard_ded = ?, he_cess = ?, new_old = ?, upd_by = ?, upd_dt = ? WHERE id = ?";
  con.query(sql, [Fin_year, start_of_slab, end_of_slab, percentage, employee_typ, standard_ded, he_cess, new_old, upd_by, upd_dt, id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});

// Delete an IT tax slab entry
router.delete('/delete_it_tax_slab/:id', (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM it_tax_slab WHERE id = ?";
  con.query(sql, [id], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true });
  });
});



router.get('/employee_salaries', (req, res) => {
  const sql = "SELECT id, name, salary FROM employee";
  con.query(sql, (err, result) => {
      if (err) {
          console.error("Error fetching employee salaries:", err);
          return res.json({ Status: false, Error: "Query Error" });
      }
      return res.json({ Status: true, Result: result });
  });
});


// Fetch all supplementary payments
router.get('/supplementary-payments', (req, res) => {
    con.query('SELECT * FROM supplementary_payments', (err, result) => {
      if (err) {
        res.status(500).json({ Status: false, Error: err.message });
      } else {
        res.json({ Status: true, Result: result });
      }
    });
  });
  
  // Fetch a specific supplementary payment by ID
  router.get('/supplementary-payment/:id', (req, res) => {
    const id = req.params.id;
    con.query('SELECT * FROM supplementary_payments WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ Status: false, Error: err.message });
      } else {
        res.json({ Status: true, Result: result });
      }
    });
  });
  
  // Add a new supplementary payment
  router.post('/addsupplementary-payment', (req, res) => {
    const { employee_id, bonus_amount, year, month, up_by } = req.body;
    const up_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    con.query(
      'INSERT INTO supplementary_payments (employee_id, bonus_amount, year, month, up_by, up_date) VALUES (?, ?, ?, ?, ?, ?)',
      [employee_id, bonus_amount, year, month, up_by, up_date],
      (err, result) => {
        if (err) {
          res.status(500).json({ Status: false, Error: err.message });
        } else {
          res.json({ Status: true, Message: 'Supplementary payment added successfully' });
        }
      }
    );
  });
  
  // Edit an existing supplementary payment
  router.put('/editsupplementary-payment/:id', (req, res) => {
    const id = req.params.id;
    const { employee_id, bonus_amount, year, month, up_by } = req.body;
    const up_date = new Date().toISOString().slice(0, 19).replace('T', ' ');
    con.query(
      'UPDATE supplementary_payments SET employee_id=?, bonus_amount=?, year=?, month=?, up_by=?, up_date=? WHERE id=?',
      [employee_id, bonus_amount, year, month, up_by, up_date, id],
      (err, result) => {
        if (err) {
          res.status(500).json({ Status: false, Error: err.message });
        } else {
          res.json({ Status: true, Message: 'Supplementary payment updated successfully' });
        }
      }
    );
  });
  
  // Delete an existing supplementary payment
  router.delete('/deletesupplementary-payment/:id', (req, res) => {
    const id = req.params.id;
    con.query('DELETE FROM supplementary_payments WHERE id = ?', [id], (err, result) => {
      if (err) {
        res.status(500).json({ Status: false, Error: err.message });
      } else {
        res.json({ Status: true, Message: 'Supplementary payment deleted successfully' });
      }
    });
});


// Add this new route to fetch supplementary payment for a specific employee
router.get('/supplementary-payments/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const sql = "SELECT * FROM supplementary_payments WHERE employee_id = ? ORDER BY year DESC, month DESC LIMIT 1";
    con.query(sql, [employeeId], (err, result) => {
      if (err) {
        console.error("Error fetching supplementary payment:", err);
        return res.json({ Status: false, Error: "Query Error" + err });
      }
      return res.json({ Status: true, Result: result });
    });
  });
  
  // Add this new route to fetch tax slabs
  router.get('/tax-slabs', (req, res) => {
    const sql = "SELECT * FROM it_tax_slab ORDER BY start_of_slab ASC";
    con.query(sql, (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" + err });
      return res.json({ Status: true, Result: result });
    });
  });
  
  
  
export { router as adminRouter };