
//const mongoose = require("mongoose");
const createError = require('http-errors');
const express = require("express");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors");
const renovationToken = require("./controllers/RenovationToken")
const authToken = require("./auth/auth");
const debug = require('debug')('server:server');
const http = require('http');
var PORT = process.env.PORT || '3001';
const displayRoutes = require("express-routemap");


// database 
const database = require('./config/database');
// routers
const usuariosRouter = require('./routes/usuario.router');
const negociosRouter = require('./routes/negocio.router');
const adminRouter = require('./routes/admin.router');
const empleadoRouter = require('./routes/empleadoRouter');
const productosRouter=require('./routes/productos.router')
const citasRouter = require('./routes/cita.router');
const { default: mongoose } = require('mongoose');
//mongo connection
database.mongoConnect();

const app = express();




app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(express.json({ extended: true }));

//router 
app.get("/api/refrescar", authToken, renovationToken);
app.use('/api/users', usuariosRouter);
app.use('/api/negocio', negociosRouter);
app.use('/api/admin', adminRouter);
app.use('/api/empleados', empleadoRouter);
app.use('/api/producto', productosRouter);
app.use('/api/cita', citasRouter);

//cath 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});


//eror handler
app.use((err, req, res,) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env' === 'develoment' ? err: {});

    // render the error page
    const CODE = 500
    res.status(err.status || CODE);
    res.render('error');
});

app.listen(PORT, () => {
    displayRoutes(app);
    console.log(`API RUNNING ON PORT ${PORT}`);
});
module.exports = app;

