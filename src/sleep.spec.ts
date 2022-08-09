import { expectTypeOf } from 'expect-type';
import ms from 'ms';

import sleep, { rejectAfter } from './sleep';

const MAX_SAFE_VALUE = 2_147_483_647;
const STRING_DELAY = '1 second';
const DELAY = ms(STRING_DELAY);
const VALUE = Symbol('value');
const ERR = new Error('error');


type UnwrapPromise<P> = P extends Promise<infer T> ? T : P;

describe('sleep', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe('delay values', () => {
    describe('when provided a string', () => {
      it('should resolve after the provided delay', async () => {
        const resultPromise = sleep(STRING_DELAY, VALUE);
        jest.advanceTimersByTime(DELAY);
        const result = await resultPromise;
        expect(result).toBe(VALUE);
      });

      describe('that cannot be parsed as an interval', () => {
        it('should throw an error', async () => {
          expect.assertions(1);

          try {
            await sleep('but i am le tired');
          } catch (err: any) {
            expect(err?.message).toMatch('Invalid interval');
          }
        });
      });
    });

    describe('when provided a number', () => {
      describe('that can be represented by a signed 32-bit integer', () => {
        it('should resolve after the provided delay', async () => {
          const resultPromise = sleep(DELAY, VALUE);
          jest.advanceTimersByTime(DELAY);
          const result = await resultPromise;
          expect(result).toBe(VALUE);
        });
      });

      describe('that cannot be represented by a signed 32-bit integer', () => {
        it('should use the largest possible value instead', async () => {
          const resultPromise = sleep(Number.MAX_SAFE_INTEGER, VALUE);
          jest.advanceTimersByTime(MAX_SAFE_VALUE);
          const result = await resultPromise;
          expect(result).toBe(VALUE);
        });
      });
    });
  });

  describe('resolve / reject values', () => {
    describe('when provided a non-Error', () => {
      it('should resolve with the provided value', async () => {
        const resultPromise = sleep(DELAY, VALUE);

        // Ensure the promise we got back was correctly typed.
        expectTypeOf<UnwrapPromise<typeof resultPromise>>().toEqualTypeOf<typeof VALUE>();

        jest.advanceTimersByTime(DELAY);
        const result = await resultPromise;
        expect(result).toBe(VALUE);
      });
    });

    describe('when provided an Error', () => {
      it('should reject with the error', async () => {
        expect.assertions(1);

        const rejectValue = new Error('reject');

        try {
          const resultPromise = sleep(DELAY, rejectValue);

          // Ensure the promise we got back was correctly typed.
          expectTypeOf<UnwrapPromise<typeof resultPromise>>().toEqualTypeOf<never>();

          jest.advanceTimersByTime(DELAY);
          await resultPromise;
        } catch (err) {
          expect(err).toEqual(rejectValue);
        }
      });
    });
  });

  afterAll(() => {
    jest.useFakeTimers();
  });
});


// Note: Because this function uses the same delay-parsing logic as `sleep`, we
// don't need to test it again here.
// Note: Jest appears to be mocking Atomics.wait so as to make them time-out
// immediately, so we don't need to interact with timers here.
describe('sleep.sync', () => {
  describe('return / throw values', () => {
    describe('when provided a non-Error', () => {
      it('should return the value after the provided delay', () => {
        const returnValue = {};
        const receivedValue = sleep.sync(DELAY, returnValue);
        expect(receivedValue).toBe(returnValue);
      });
    });

    describe('when provided an Error', () => {
      it('should throw the error after the provided delay', () => {
        expect.assertions(1);

        try {
          const resultValue = sleep.sync(DELAY, ERR);

          // Ensure the value we got back was correctly typed.
          expectTypeOf<typeof resultValue>().toEqualTypeOf<never>();

        } catch (err) {
          expect(err).toBe(ERR);
        }
      });
    });
  });
});


describe('rejectAfter', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  describe('when provided a string', () => {
    it('should reject after the provided delay', async () => {
      expect.assertions(1);

      try {
        const resultPromise = rejectAfter(STRING_DELAY, ERR);
        jest.advanceTimersByTime(DELAY);
        await resultPromise;
      } catch (err) {
        expect(err).toBe(ERR);
      }
    });
  });

  describe('when provided a number', () => {
    describe('that can be represented by a signed 32-bit integer', () => {
      it('should resolve after the provided delay', async () => {
        expect.assertions(1);

        try {
          const resultPromise = rejectAfter(DELAY, ERR);
          jest.advanceTimersByTime(DELAY);
          await resultPromise;
        } catch (err) {
          expect(err).toBe(ERR);
        }
      });
    });

    describe('that cannot be represented by a signed 32-bit integer', () => {
      it('should use the largest possible value instead', async () => {
        expect.assertions(1);

        try {
          const resultPromise = rejectAfter(Number.MAX_SAFE_INTEGER + 100, ERR);
          jest.advanceTimersByTime(MAX_SAFE_VALUE);
          await resultPromise;
        } catch (err) {
          expect(err).toBe(ERR);
        }
      });
    });
  });

  afterAll(() => {
    jest.useFakeTimers();
  });
});
