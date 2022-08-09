import ms from 'ms';


/**
 * @private
 *
 * Largest number that can be represented by a signed 32-bit integer. If any
 * value greater than this is passed to `setTimeout`, Node will issue a warning
 * and set the timeout value to 1ms.
 */
const MAX_SAFE_VALUE = 2_147_483_647;


/**
 * @private
 *
 * Array used by Atomics.wait in sleep.sync.
 *
 * Note: The minimum byte length for this type of array is 4.
 */
const TYPED_ARRAY = new Int32Array(new SharedArrayBuffer(4));


/**
 * @private
 *
 * Accepts a string or a number (ie: '5s', '20 seconds', 5000) and returns a
 * number.
 */
function parseTime(time: string | number): number {
  const parsedTime = typeof time === 'number' ? time : ms(time);

  if (parsedTime === undefined) {
    throw new Error(`[sleep] Invalid interval: ${time}`);
  }

  if (parsedTime > MAX_SAFE_VALUE) {
    return MAX_SAFE_VALUE;
  }

  return parsedTime;
}


export type FinalValue<V> = V extends Error ? never : V;


/**
 * Returns a Promise that settles after the provided `delay`, which may be
 * expressed as a number (of milliseconds) or as a string ('10 seconds').
 *
 * If an instance of `Error` was passed as the second argument, the Promise will
 * reject with the error. If any other value was provided, the Promise will
 * resolve with the value.
 */
export default async function sleep<T = any>(delay: string | number, value?: T): Promise<FinalValue<T>> {
  if (value instanceof Error) {
    await sleep(delay);
    throw value;
  }

  return new Promise(resolve => {
    setTimeout(() => resolve(value as any), parseTime(delay));
  });
}


/**
 * **Warning: This function will block the JavaScript thread in which is was
 * called and should therefore be used with extreme caution.**
 *
 * Synchronously waits the provided `delay`, which may be expressed as a number
 * (of milliseconds) or as a string ('10 seconds'). Uses `Atomics.wait`, which
 * consumes minimal resources.
 *
 * If an instance of `Error` was passed as the second argument, the error will
 * be thrown after `delay`. If any other value was provided, it will be returned
 * after `delay`.
 */
sleep.sync = <T = any>(delay: string | number, value?: T) => {
  Atomics.wait(TYPED_ARRAY, 0, 0, parseTime(delay));

  if (value instanceof Error) {
    throw value;
  }

  return value as FinalValue<T>;
};


/**
 * @deprecated Pass an Error to `sleep` to cause a rejection.
 *
 * Returns a Promise that rejects after the provided delay. Delay may be
 * expressed as a number (of milliseconds) or as a string.
 */
export async function rejectAfter<T = any>(delay: string | number, value?: T) {
  await sleep(delay);
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw value;
}
