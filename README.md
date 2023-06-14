<p align="center">
  <picture>
    <source
      media="(prefers-color-scheme: dark)"
      srcset="https://github.com/darkobits/sleep/assets/441546/8bf6427f-142f-46a9-bd79-51eb78f85e52"
      width="100%"
    >
    <img
      src="https://github.com/darkobits/sleep/assets/441546/2f4e8e4a-ebed-4bd7-bb0f-704e925a5a37"
      width="100%"
    >
  </picture>
</p>
<p align="center">
  <a
    href="https://www.npmjs.com/package/@darkobits/sleep"
  ><img
    src="https://img.shields.io/npm/v/@darkobits/sleep.svg?style=flat-square"
  ></a>
  <a
    href="https://github.com/darkobits/sleep/actions?query=workflow%3Aci"
  ><img
    src="https://img.shields.io/github/actions/workflow/status/darkobits/sleep/ci.yml?style=flat-square"
  ></a>
  <a
    href="https://depfu.com/repos/github/darkobits/sleep"
  ><img
    src="https://img.shields.io/depfu/darkobits/sleep?style=flat-square"
  ></a>
  <a
    href="https://conventionalcommits.org"
  ><img
    src="https://img.shields.io/static/v1?label=commits&message=conventional&style=flat-square&color=398AFB"
  ></a>
  <a
    href="https://firstdonoharm.dev"
  ><img
    src="https://img.shields.io/static/v1?label=license&message=hippocratic&style=flat-square&color=753065"
  ></a>
</p>

This package provides a means to pause JavaScript execution.

# Install

```
npm install @darkobits/sleep
```

# Use

The most common way to use this tool is asynchronously using `async` / `await`. This will pause the
execution of code within the current function without blocking the main thread.

If a second parameter is provided, the following rules will be followed:

1. If the value is an instance of `Error` (including anything that subclasses it), reject with the error
   after the provided delay.
2. If any other value is provided, resolve after the provided delay with the value.

```ts
import sleep from '@darkobits/sleep';

// Wait for 5 seconds:
await sleep(5000);

// Or, wait for 5 seconds:
await sleep('5 seconds');

// Or, wait for 5 seconds:
await sleep('5s');

// Or, wait for 5 seconds and resolve with a value:
const foo = await sleep('5 seconds', 'foo');

// Or, wait for 5 seconds and reject with an error:
try {
  await sleep('5s', new Error('Barnacles!'));
} catch (err) {
  console.error(err.message) // 'Barnacles!'
}
```

## Synchronous Usage

This package provides a means to pause execution of the main JavaScript thread using `SharedArrayBuffer`
and `Atomics.wait`, which will not spike CPU usage like `while` loops and other approaches.

```ts
import sleep from '@darkobits/sleep';

// Wait for 5 seconds:
sleep.sync(5000);

// Or, wait for 5 seconds:
sleep.sync('5 seconds');

// Or, wait for 5 seconds:
sleep.sync('5s');

// Or, wait for 5 seconds and return a value:
const foo = sleep.sync('5 seconds', 'foo');

// Or, wait for 5 seconds and throw an error:
try {
  sleep.sync('5s', new Error('Barnacles!'));
} catch (err) {
  console.error(err.message) // 'Barnacles!'
}
```

## Caveats

- The APIs required for `sleep.sync` to work (specifically `SharedArrayBuffer`) may not be available in
  all browser contexts. For more information, see [this article](https://blog.logrocket.com/understanding-sharedarraybuffer-and-cross-origin-isolation/).
- The maximum timeout value that can be passed to `setTimeout` is `2_147_483_647` milliseconds; the
  maximum value that can be represented in a signed 32-bit integer. Passing a value larger than this
  will cause a `TimeoutOverflowWarning` and the timeout will be set to `1`. This value turns out to be
  just under 25 days, and is therefore far longer than any reasonable use should require. However, since
  this is primarily a tool for debugging and development, any timeout value that exceeds the maximum
  will be coerced to the maximum value so that things like `sleep(Infinity)` will not violate the
  [Principle of Least Astonishment](https://en.wikipedia.org/wiki/Principle_of_least_astonishment).

<br />
<a href="#top">
  <img src="https://user-images.githubusercontent.com/441546/189774318-67cf3578-f4b4-4dcc-ab5a-c8210fbb6838.png" style="max-width: 100%;">
</a>
