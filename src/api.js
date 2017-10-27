// @flow
import axios from 'axios';

global.Verification = {};

export const login = (name, password, cal) =>
    new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: 'http://ued.vemic.com/login',
            data: { name, password },
            headers: {
                'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
            },
        })
            .then(ret => {
                if (ret.data.status !== 1) {
                    return resolve(ret.data);
                }
                const cookie = ret.headers['set-cookie'][0].split(';')[0];
                global.Verification[name] = cookie;
                resolve({
                    status: 1,
                    info: '登录成功',
                });
            })
            .catch(err => {
                reject({
                    status: 0,
                    info: err,
                });
            });
    });

//获取自己和关注人todo列表
// export const bus = cookie => {};
export const bus = cookie =>
    new Promise((resolve, reject) => {
        const url = 'http://ued.vemic.com/todo/bus';
        axios({
            url,
            method: 'post',
            data: {
                per: 50,
                current: 1
            },
            headers: {
                Cookie: cookie,
                'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36'
            }
        })
            .then(ret => {
                resolve(ret.data);
            })
            .catch(err => {
                reject(err);
            });
    });

//根据 任务id 和 spendtime 更新 todo任务时间变化
// export const update = (cookie, id, spendTime) => {};

//获取关注人列表
export const follow = cookie =>
    new Promise((resolve, reject) => {
        const url = 'http://ued.vemic.com/user/follow';
        axios({
            url,
            method: 'get',
            headers: {
                Cookie: cookie,
                'User-Agent':
                'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36',
            },
        })
            .then(ret => {
                resolve(ret.data);
            })
            .catch(err => {
                reject(err);
            });
    });
