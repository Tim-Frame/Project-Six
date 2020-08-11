const express= require('express');
const app = express();

const  { projects }  = require('./data.json')

app.set('view engine', 'pug')

app.use('/static', express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('index',  { projects } )
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/projects/:id', (req, res, next) => {
    const err = new Error('Sorry that page cannot be found')
    err.status = 404;
    const project = projects.find(project => project.id === req.params.id)
    if(project){
        res.render('project', {project} )
    }else {
       next(err); 
    }
})

app.use((req, res, next) => {
    const err = new Error('Sorry that page cannot be found')
    err.status = 404;
    next(err);
})


app.use((err, req, res, next) => {
    res.locals.error = err;
    res.render('error')
})





app.listen(3000);





