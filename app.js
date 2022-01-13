const express = require('express');
const app = express();
const path = require('path');
require('./models');

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use('*/images',express.static('public/images'));

app.set('view engine','ejs');

const router = require('./routers/userRoute')
app.use('/',router);

const port = 3000;
app.listen(port,()=>{
    console.log(`app is listening at port ${port}`);
});