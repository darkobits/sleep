<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/53388255-3798e280-393f-11e9-8433-24839585d7bf.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/sleep"><img src="https://img.shields.io/npm/v/@darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/sleep/actions"><img src="https://img.shields.io/endpoint?url=https://aws.frontlawn.net/ga-shields/darkobits/sleep&style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/sleep"><img src="https://img.shields.io/codacy/coverage/7c3df85cd6264b59a7a39a99be6599f7.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/sleep"><img src="https://img.shields.io/david/darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-FB5E85.svg?style=flat-square"></a>
</p>

> Sometimes your app just needs to take a break.

Useful for developing and debugging async logic.

# Install

```
npm install @darkobits/sleep
```

# Use

```ts
import sleep from '@darkobits/sleep';

async function main() {
  // Wait for 5 seconds:
  await sleep(5000);

  // Or, wait for 5 seconds:
  await sleep('5 seconds');

  // Or, wait for 5 seconds:
  await sleep('5s');

  // Or, wait for 5 seconds and resolve with a value:
  const foo = await sleep('5 seconds', 'foo');
}
```

```ts
import {rejectAfter} from '@darkobits/sleep';

async function main() {
  // Wait for 5 seconds, then reject:
  await rejectAfter(5000);

  // Or, wait for 5 seconds, then reject:
  await rejectAfter('5 seconds');

  // Or, wait for 5 seconds, then reject:
  await rejectAfter('5s');

  try {
    // Or, wait for 5 seconds and reject with a value:
    const foo = await rejectAfter('5 seconds', new Error('blearg!'));
  } catch (err) {
    console.log(err.message) //=> 'blearg!'
  }
}
```

## Caveats

The maximum value that can be passed to `setTimeout` is `2147483647`; the maximum value that can be represented in a signed 32-bit integer. If a value greater than this is used, Node will issue a warning and set the value to `1` instead. Therefore, if you try to `sleep(Infinity)` (or anything over the maximum allowed value) this will be corrected to `sleep(2147483647)`, which works out to about 25 days.

If you need your program to wait for longer than that, please get in touch with me, because I'd _really_ like to know what you're building.

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>
