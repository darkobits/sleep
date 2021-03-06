<a href="#top" id="top">
  <img src="https://user-images.githubusercontent.com/441546/102317184-f7e42600-3f2b-11eb-89c4-908643f38f5c.png" style="max-width: 100%;">
</a>
<p align="center">
  <a href="https://www.npmjs.com/package/@darkobits/sleep"><img src="https://img.shields.io/npm/v/@darkobits/sleep.svg?style=flat-square"></a>
  <a href="https://github.com/darkobits/sleep/actions?query=workflow%3ACI"><img src="https://img.shields.io/github/workflow/status/darkobits/sleep/CI/master?style=flat-square"></a>
  <a href="https://app.codecov.io/gh/darkobits/sleep/branch/master"><img src="https://img.shields.io/codecov/c/github/darkobits/sleep/master?style=flat-square"></a>
  <a href="https://depfu.com/github/darkobits/sleep"><img src="https://img.shields.io/depfu/darkobits/sleep?style=flat-square"></a>
  <a href="https://conventionalcommits.org"><img src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"></a>
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

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/118062198-4ff04e80-b34b-11eb-87f3-406a345d5526.png" style="max-width: 100%;">
</a>
