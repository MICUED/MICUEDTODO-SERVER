// @flow
import { follow, login } from './api';
import { followFun, index, loginFun, sm, busFun,statisticsFun } from './controller';
import bodyparser from 'koa-bodyparser';
import con from './db';
import koa from 'koa';
import logger from 'koa-logger';
import push from './push.js';
import route from 'koa-route';

const app = new koa();
app.use(bodyparser());
app.use(logger());

app.use(route.get('/', index));
app.use(route.get('/sm', sm));
app.use(route.post('/login', loginFun));
app.use(route.get('/follow', followFun));
app.use(route.get('/bus', busFun));
app.use(route.get('/statistics', statisticsFun));

app.listen(9000);
