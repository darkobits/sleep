import LogFactory from '@darkobits/log';

import sleep from '../dist/sleep.js';


const log = LogFactory({ heading: 'test' });


function valueTest() {
  const time = log.createTimer();

  log.info(log.prefix('value'), 'Waiting...');
  const received = sleep.sync('2s', true);
  log.info(log.prefix('value'), 'Received', received);
  log.info(log.prefix('value'), log.chalk.gray(`Done in ${time}.`));
}


function errorTest() {
  const time = log.createTimer();

  try {
    log.info(log.prefix('error'), 'Waiting...');
    sleep.sync('2s', new Error('Error'));
  } catch (err) {
    log.info(log.prefix('error'), 'Received', err);
    log.info(log.prefix('error'), log.chalk.gray(`Done in ${time}.`));
  }
}


void valueTest();
// eslint-disable-next-line no-console
console.log();
void errorTest();
