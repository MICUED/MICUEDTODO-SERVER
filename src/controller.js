// @flow
import { follow, login ,bus,statistics} from './api';
import push from './push';

export const index = ctx => {
    ctx.response.body = '1231231';
};

export const sm = ctx => {
    const { message } = ctx.request.query;
    if (!message) {
        return;
    }
    ctx.response.body = `发送成功，发送内容:${message}`;

    push({ message })
        .then(res => {
            console.log(`Sendno: ${res.sendno}`);
            console.log(`Msg_id: ${res.msg_id}`);
            // con.query(`insert into notification (register_id,register_name) values (${res.msg_id},${message})`, (error, results, fields) => {
            //   if (error) throw error;
            //   console.log('The solution is: ', results[0]);
            // })
        })
        .then(rej => {
            console.log(rej);
        });
};

export const loginFun = async (ctx, res, next) => {
    const { name, pwd } = ctx.request.body;
    const ret = await login(name, pwd, null);
    ctx.body = ret;
};

export const busFun = async(ctx) => {
    const {userName} = ctx.request.query
    const ret  = await bus(global.Verification[userName]);
    ctx.body = ret
}

export const statisticsFun = async(ctx) => {
    const {userName} = ctx.request.query
    const ret  = await statistics(global.Verification[userName]);
    ctx.body = ret
}

export const followFun = ctx => {
    console.log(global.Verification.yinshuxun);
    follow(global.Verification.yinshuxun).then(ret => {
        console.log(ret);
    });
};
