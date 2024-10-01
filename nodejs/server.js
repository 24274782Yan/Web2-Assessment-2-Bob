const express = require('express');
const db = require('./crowdfunding_db');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); 

// Get all active fundraisers
app.get('/fundraisers', (req, res) => {
    const sql = `SELECT f.*, c.NAME AS CATEGORY_NAME 
                 FROM FUNDRAISER f 
                 JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
                 WHERE f.ACTIVE = TRUE`;
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Get all categories
app.get('/categories', (req, res) => {
    const sql = 'SELECT * FROM CATEGORY';
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Get active fundraisers by criteria
app.get('/search', (req, res) => {
    const { organizer, city, categoryId } = req.query;
    let sql = `SELECT f.*, c.NAME AS CATEGORY_NAME 
               FROM FUNDRAISER f 
               JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
               WHERE f.ACTIVE = TRUE`;
    const conditions = [];
    if (organizer) {
        conditions.push(`f.ORGANIZER LIKE '%${organizer}%'`);
    }
    if (city) {
        conditions.push(`f.CITY LIKE '%${city}%'`);
    }
    if (categoryId) {
        conditions.push(`f.CATEGORY_ID = ${db.escape(categoryId)}`);
    }
    if (conditions.length) {
        sql += ' AND ' + conditions.join(' AND ');
    }
    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results);
    });
});

// Get fundraiser details by ID
app.get('/fundraiser/:id', (req, res) => {
    const sql = `SELECT f.*, c.NAME AS CATEGORY_NAME 
                 FROM FUNDRAISER f 
                 JOIN CATEGORY c ON f.CATEGORY_ID = c.CATEGORY_ID 
                 WHERE f.FUNDRAISER_ID = ?`;
    db.query(sql, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(results[0]);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
