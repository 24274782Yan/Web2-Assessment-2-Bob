const express = require('express');
const db = require('.crowdfunding_db');
const app = express();
const port = 3000;

app.use(express.json());

 Get all active fundraisers
app.get('fundraisers', (req, res) = {
    db.query('SELECT  FROM FUNDRAISER WHERE ACTIVE = TRUE', (err, results) = {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

 Get all categories
app.get('categories', (req, res) = {
    db.query('SELECT  FROM CATEGORY', (err, results) = {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

 Get fundraisers by criteria
app.get('search', (req, res) = {
    const { organizer, city, category_id } = req.query;
    const query = `SELECT  FROM FUNDRAISER WHERE ACTIVE = TRUE ${organizer  'AND ORGANIZER LIKE '  ''} ${city  'AND CITY LIKE '  ''} ${category_id  'AND CATEGORY_ID = '  ''}`;
    const params = [organizer  `%${organizer}%`  undefined, city  `%${city}%`  undefined, category_id].filter(param = param !== undefined);
    
    db.query(query, params, (err, results) = {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

 Get fundraiser details by ID
app.get('fundraiserid', (req, res) = {
    const { id } = req.params;
    db.query('SELECT  FROM FUNDRAISER WHERE FUNDRAISER_ID = ', [id], (err, results) = {
        if (err) return res.status(500).send(err);
        res.json(results[0]);
    });
});

app.listen(port, () = {
    console.log(`Server running at httplocalhost${port}`);
});
