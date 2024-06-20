const express = require('express');

const app = express();

app.use((req, res, next) => {
    let body = '';
    
    req.on('data', (chunk) => {
        body += chunk;
    });

    req.on('end', () => {
        const userName = body.split('=')[1];

        if (userName) {
            console.log(userName);
            req.body = {name : userName};
        }
        next();
    });

});

app.use((req, res, next) => {
    
    if (req.body) {
        res.send('User: ' + req.body.name);
    }
    else {
        res.send(`<form method="POST">
                <input type="text" name="user-name"/>
                <button type="submit">Create User</button>
            </form>`
        );
    }
});

app.listen(3005);