// @flow
import koa from 'koa';
import route from 'koa-route';
import logger from 'koa-logger'
import bodyparser from 'koa-bodyparser'
import push from './push.js';
import con from './db';
import { login, follow } from './api'
import { index, sm, loginFun, followFun } from './controller'

const app = new koa();
app.use(bodyparser())
app.use(logger())

app.use(route.get('/', index));
app.use(route.get('/sm', sm));
app.use(route.post('/login',loginFun));
app.use(route.get('/follow', followFun));

app.listen(9000);
