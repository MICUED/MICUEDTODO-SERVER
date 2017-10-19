// @flow
import push from './push';
import schedule from 'node-schedule';

const j = schedule.scheduleJob({ hour: 14, minute: 10 }, () => {
  const message = '定时任务';
  push({ message })
    .then(res => {
      console.log(`Sendno: ${res.sendno}`);
      console.log(`Msg_id: ${res.msg_id}`);
    })
    .then(rej => {
      console.log(rej);
    });
});
