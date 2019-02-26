<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/53388255-3798e280-393f-11e9-8433-24839585d7bf.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/sleep"><img src="https://img.shields.io/npm/v/@darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://travis-ci.org/darkobits/sleep"><img src="https://img.shields.io/travis/darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/sleep"><img src="https://img.shields.io/codacy/coverage/7c3df85cd6264b59a7a39a99be6599f7.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/sleep"><img src="https://img.shields.io/david/darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
  <a href="https://github.com/sindresorhus/xo"><img src="https://img.shields.io/badge/code_style-XO-e271a5.svg?style=flat-square"></a>
</p>

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

  try {
    // Or, wait for 5 seconds and reject with a value:
    const foo = await sleep('5 seconds', new Error('blearg!'));
  } catch (err) {
    console.log(err.message) //=> 'blearg!'
  }
}
```

## &nbsp;
<p align="center">
  <br>
  <img width="22" height="22" src="https://cloud.githubusercontent.com/assets/441546/25318539/db2f4cf2-2845-11e7-8e10-ef97d91cd538.png">
</p>
