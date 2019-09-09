// Load the MySQL pool connection
var pool = require('../data/config');

// Route the app
var router = app => {
    // Display welcome message on the root
    console.log('is isissisiisisisiissi is ')

    // app.use(function (req, res, next) {
    //     res.send('Hello World')
    //   })

    app.get('/', (request, response) => {
        response.send({
            message: 'Welcome to the Node.js Express REST API!'
        });
    });

    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        var id = request.params.id;
        console.log('is isissisiisisisiissi is ', id)
        pool.query('SELECT* FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        console.log('request is ', request.body)
        //console.log('error is ',JSON.parse(request.body))
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            // console.log('error is ',error.code)
            //console.log('error is ',error.message)
            //console.log('error is ',response.body)
            if (error) throw error;
            response.status(201).send(`User added a, as ,s fs f`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        var id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        var id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });


    //for messages
    // Add a new user
    app.post('/messges', (request, response) => {
        console.log('request is ', request.body.key)
        //console.log('error is ',JSON.parse(request.body))
        pool.query('INSERT INTO messges SET ?', request.body, (error, result) => {
            if (error) throw error
            //{
            //     console.log('error is ', error.sqlState)
            //     console.log('error is ', error.message)
            //     console.log('error is ', response.body)
            // };
            response.status(200).send(`Message Has Been Sent`);
        });
    });

    //display all messgaes
    app.get('/messges', (request, response) => {
        pool.query('SELECT * FROM messges', (error, result) => {
            console.log('requested id is ',request.query.user_id)
            if (error) throw error;
            response.send(result);
        });
    });
}

// Export the router
module.exports = router;
