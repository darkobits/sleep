import ms from 'ms';


/**
 * Returns a Promise that resolves after the provided delay. Delay
 * may be expressed as a number of milliseconds or as a string.
 */
export default async function sleep<T = any>(timeout: string | number, value?: T) {
  const parsedTimeout = typeof timeout === 'number' ? timeout : ms(timeout);

  return new Promise<T>(resolve => {
    setTimeout(() => {
      resolve(value);
    }, parsedTimeout);
  });
}


/**
 * Returns a Promise that rejects after the provided timeout.
 */
export async function rejectAfter<T = any>(timeout: string | number, value?: T) {
  const parsedTimeout = typeof timeout === 'number' ? timeout : ms(timeout);

  return new Promise<T>((_, reject) => {
    setTimeout(() => {
      reject(value);
    }, parsedTimeout);
  });
}
