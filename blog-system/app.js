/**
 * Module dependencies.
 */

require('./lib/db');
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.configure(function(){
//啟用cookie解析器
app.use(express.cookieParser());
//啟用Session
app.use(express.cookieSession({
key:'node',
secret:'HelloExpressSESSION'
}));
//啟用body解析器
app.use(express.bodyParser());
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/register', user.register);		//使用者註冊頁面
app.get('/signin', user.signin);			//使用者登入頁面
app.get('/signout', user.signout);			//使用者登頁面
app.get('/forget', user.forget);			//忘記密碼頁面
app.get('/add_article', user.add_article);	//新增文章頁面
app.get('/profile', user.profile);			//使用者管理頁面
app.get('/modify/:id', user.modify);		//修改文章頁面
app.get('/message/:id', user.message);		//訪客客留言頁面
app.post('/apis/login', user.login);
app.post('/apis/add', user.add);
app.get('/apis/delete/:id', user.del_article);
app.post('/apis/update/:id', user.update);
app.post('/apis/comment/:id', user.comment);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
