const { Router } = require('express');
const router = Router();
const fetch = require('node-fetch');
const fs = require('fs');
const uuid = require('uuid').v4;

router.get('/players', async (req, res) => {
    const response = await fetch('https://www.balldontlie.io/api/v1/players');
    const players = await response.json();
    let player = Object.values(players.data);
    res.render('players.ejs', {
        player
    });
});

const json_Q_enta = fs.readFileSync('src/Q-enta.json', 'utf-8');
let Q_enta = JSON.parse(json_Q_enta);

router.get('/', (req, res) => {
    res.render('index.ejs',{
        Q_enta
    });
});

router.get('/new-entry', (req, res) => {
    res.render('new-entry.ejs');
});

router.post('/new-entry', (req, res) => {
    const   { 
                id, 
                first_name, 
                height_feet, 
                height_inches,
                last_name,
                position,
                team,
                team_id,
                team_abbreviation,
                team_city,
                team_conference,
                team_division,
                team_full_name,
                team_name,
                weight_pounds
            } = req.body;
    
       let newQ_enta = { 
                id: uuid(), 
                first_name, 
                height_feet, 
                height_inches,
                last_name,
                position,
                team,
                team_id,
                team_abbreviation,
                team_city,
                team_conference,
                team_division,
                team_full_name,
                team_name,
                weight_pounds
            };

    console.log(req.body);
    Q_enta.push(newQ_enta);
    
    const json_Q_write = JSON.stringify(Q_enta);
    fs.writeFileSync('src/Q-enta.json', json_Q_write, 'utf-8');
    res.redirect('/');
});

// router.get('/edit/:id', (req, res) => {

//     console.log(req.params);
//     // Q_enta = Q_enta.filter( Q_enta => Q_enta.id != req.params.id);
//     // const json_Q_write = JSON.stringify(Q_enta);
//     // fs.writeFileSync('src/Q-enta.json', json_Q_write, 'utf-8');
//     res.redirect('/edit');  
//     res.send('Item Edited');

// });


router.get('/delete/:id', (req, res) => {

    console.log(req.params);
    Q_enta = Q_enta.filter( Q_enta => Q_enta.id != req.params.id);
    const json_Q_write = JSON.stringify(Q_enta);
    fs.writeFileSync('src/Q-enta.json', json_Q_write, 'utf-8');
    res.redirect('/');  
    res.send('Item deleted');

});

module.exports = router;