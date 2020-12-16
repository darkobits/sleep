<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/102317184-f7e42600-3f2b-11eb-89c4-908643f38f5c.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/sleep"><img src="https://img.shields.io/npm/v/@darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://travis-ci.com/darkobits/sleep"><img src="https://img.shields.io/travis/com/darkobits/sleep/master?style=flat-square"></a>
  <a href="https://www.codacy.com/app/darkobits/sleep"><img src="https://img.shields.io/codacy/coverage/7c3df85cd6264b59a7a39a99be6599f7.svg?style=flat-square"></a>
  <a href="https://david-dm.org/darkobits/sleep"><img src="https://img.shields.io/david/darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://github.com/conventional-changelog/standard-version"><img src="https://img.shields.io/badge/conventional%20commits-1.0.0-027dc6.svg?style=flat-square"></a>
</p>

Utility for developing and debugging async logic.

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

For convenience, this package also exports `rejectAfter`, which will wait the
indicated time and then reject, optionally with a value.

```ts
import {rejectAfter} from '@darkobits/sleep';

async function main() {
  try {
    // Or, wait for 5 seconds and reject with an Error:
    await rejectAfter('5 seconds', new Error('Barnacles!'));
  } catch (err) {
    console.log(err.message) //=> 'Barnacles!'
  }
}
```

## Caveats

The maximum value that can be passed to `setTimeout` is `2147483647`; the
maximum value that can be represented in a signed 32-bit integer. If a value
greater than this is used, Node will issue a warning and set the value to `1`
instead. Therefore, if you try to `sleep(Infinity)` (or anything over the
maximum allowed value) this will be corrected to `sleep(2147483647)`, which
works out to about 25 days.

If you need your program to wait for longer than that, please get in touch with
me, because I'd _really_ like to know what you're building.

<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/102315151-835bb800-3f28-11eb-8cf4-8bd74b94ddc3.png" style="max-width: 100%;">
</a>
