const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// const user = require('./routes/user');

dotenv.config({ path: './config/config.env' });

connectDB();

const app = express(); 

app.use(cookieParser());
app.use(fileupload());

app.use(mongoSanitize());

app.use(xss());

app.use(hpp());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, 
    max: 100
})

app.use(limiter);

app.use(helmet());


app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//! read/parse json data
app.use(bodyParser.json())

// use our logger
app.use(logger);

// app.use('/api/v1/user', user);


app.use(errorHandler);

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`)
})

// process our error and close off our server
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    // kill server
    server.close(() => process.exit(1))
})