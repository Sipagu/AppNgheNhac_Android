const searchRouter = require('./Search.route');
const listSongRouter = require('./ListSong.route');
const logInRouter = require('./LogIn.route');
const signUpRouter = require('./SignUp.route');
const loadPlayList = require('./LoadPlayList.route');
const adminRouter = require('./Admin.route');
const streamSongRouter = require('./StreamSong.route');
const insertRouter = require('./Insert.route');
const imageRouter = require('./Image.route');
const manageRouter = require('./Manage.route');
const updateUserRoute = require('./UpdateUser.route');
const resetPasswordRoute = require('./ResetPassword.route');
const albumRoute = require('./Album.route');
const categoryRoute = require('./ListCategories.route')
const singerRoute = require('./Singer.route')


const testRoute = require('./test.route');

function route(app){
    
    app.get('/', (req, res) => {
        if(req.session && (req.session.username == undefined)) res.redirect('/admin'); // if admin still not login
        else res.render('home',{isLogin: true}); // go to home if admin logged
    });
    app.use('/admin',adminRouter);
    app.use('/manage',manageRouter);
    //================================================================
    
    //json 
    app.use('/search',searchRouter);
    app.use('/ListSong',listSongRouter);
    app.use('/LogIn',logInRouter);
    app.use('/SignUp',signUpRouter);
    app.use('/PlayList',loadPlayList);
    app.use('/StreamSong',streamSongRouter);
    app.use('/Insert',insertRouter); 
    app.use('/Image',imageRouter);
    app.use('/UpdateUser',updateUserRoute);
    app.use('/ResetPassword',resetPasswordRoute);
    app.use('/Album',albumRoute);
    app.use('/Category',categoryRoute)
    app.use('/Singer',singerRoute)

    app.use('/test', testRoute);
}

module.exports = route;