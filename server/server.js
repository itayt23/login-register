const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const {PORT} = require('./config');

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));