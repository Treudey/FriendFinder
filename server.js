const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const apiRoutes = require('./app/routes/apiRoutes');
const htmlRoutes = require('./app/routes/htmlRoutes');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'app', 'public')));

app.use('/api', apiRoutes);
app.use(htmlRoutes);

app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'app', 'views', '404.html'));
});

app.listen(3000);