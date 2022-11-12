const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')



//template engine
app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, '/views'))
//app.use('views', path.join(__dirname, './views/partials'))
app.use(express.static('upload'))
app.use(express.static('./views/partials'))
//app.use(paginate.middleware(10, 50));


//middleware
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))


app.use(session({
    secret: 'secret',
    cookie:{maxAge:6000},
    resave:false,
    saveUninitialized:false
}))
app.use(flash())


//routers
const routes = require('./routes/router')
//use routes
app.use('/', routes)


const port = 5000

app.listen(port, () => {
    console.log("listening at port: ", port)
})