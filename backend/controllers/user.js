const db = require('../database');


// afficher tout les utilisateurs
exports.AllUsers = (req, res, next) => {
    let query = db.query(`SELECT * FROM users`, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
};

// afficher un utilisateur via son ID
exports.OneUser = (req, res) => {
    let id = 2;
    let query = db.query(`SELECT * FROM users WHERE id = ?`, id ,(err, results) => {
        // !err ? res.json(results) : res.json(err);
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
};

// Ajouter un utilisateur
exports.signup = (req, res, next) => {
    // let account = {email:'abc@mail.com', password:'abcdefg'};
    let email = 'abcd@gmail.com';
    let password = '123456';
    let sql = `INSERT INTO users (email, password) SET ('${email}','${password}')`;
    let query = db.query(sql, account, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Account created');
    });
};