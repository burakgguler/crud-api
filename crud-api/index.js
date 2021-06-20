const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');

const dbConnection = require('./config/database')
dbConnection.authenticate()
    .then(() => console.log('database successfully connected'))
    .catch(err => console.log('Unfortunately Error:' + err))

const app = express();

app.engine('handlebars',exphbs({defaultLayout:'main',
runtimeOptions: {
          allowProtoPropertiesByDefault: true,
          allowProtoMethodsByDefault: true,
        },
    }));

app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));