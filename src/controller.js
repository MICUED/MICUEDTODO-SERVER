import push from './push'
import { login, follow } from './api'

export const index = ctx => {
    ctx.response.body = '1231231';
};

export const sm = ctx => {
    const { message } = ctx.request.query;
    console.log(ctx.request.query);
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

export const loginFun = (ctx, next) => {
    const {name,pwd} = ctx.request.body
    console.log(name,pwd)
    login(name, pwd, null).then(ret => {

    })

}

export const followFun = ctx => {
    console.log(global.Verification['yinshuxun'])
    follow(global.Verification['yinshuxun']).then(ret => {
        console.log(ret)
    })
}
