// @flow
import db from './db';
import JPush from 'jpush-sdk';

const pushClient = JPush.buildClient('7f6f6370b15e52876f34b7e0', 'dc2e10b3e0bad4a8654b17ac');

export const nativeClient = pushClient;

export default ({ message }) =>
  new Promise((resolve, reject) => {
    pushClient
      .push()
      .setPlatform('ios', 'android')
      .setAudience(JPush.tag('todo'))
      // .setAudience(JPush.ALL)
      .setNotification(message, JPush.ios(message), JPush.android(message, null, 1))
      .setMessage('msg content')
      // .setOptions(null, 60)
      .send((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
          db.query(
            `insert into push_message (sendno,msg_id,msg_content,create_time) values (${res.sendno},${res.msg_id},${message},NOW())`,
            (error, results, fields) => {
              if (error) {
                throw error;
              }
              console.log('The solution is: ', results[0]);
            }
          );
          setTimeout(() => {
            pushClient.getReportReceiveds(res.msg_id, (err, res) => {
              console.log(res);
              if (err) {
                console.log(err.message);
              } else {
                for (let i = 0; i < res.length; i++) {
                  // console.log(res[i].android_received)
                  // console.log(res[i].ios_apns_sent)
                  // console.log(res[i].msg_id)
                }
              }
            });
          }, 4000);
        }
      });
  });
