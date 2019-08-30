import ms from 'ms';


/**
 * Largest number that can be represented by a signed 32-bit integer. If any
 * value greater than this is passed to `setTimeout`, Node will issue a warning
 * and set the timeout value to 1ms.
 */
const MAX_SAFE_VALUE = 2147483647;


/**
 * Accepts a string or a number (ie: '5s', '20 seconds', 5000) and returns a
 * number.
 */
function parseTime(time: string | number): number {
  const parsedTime = typeof time === 'number' ? time : ms(time);

  if (parsedTime > MAX_SAFE_VALUE) {
    return MAX_SAFE_VALUE;
  }

  return parsedTime;
}


/**
 * Returns a Promise that resolves after the provided delay. Delay may be
 * expressed as a number (of milliseconds) or as a string.
 */
export default async function sleep<T = any>(timeout: string | number, value?: T) {
  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(value);
    }, parseTime(timeout));
  });
}


/**
 * Returns a Promise that rejects after the provided timeout. Delay may be
 * expressed as a number (of milliseconds) or as a string.
 */
export async function rejectAfter<T = any>(timeout: string | number, value?: T) {
  return new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(value);
    }, parseTime(timeout));
  });
}
