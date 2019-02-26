import sleep, {rejectAfter} from './sleep';

jest.useFakeTimers();

const DELAY = 5000;
const STRING_DELAY = '5 seconds';

describe('sleep', () => {
  const VALUE = Symbol('value');

  describe('when provided a string', () => {
    it('should resolve after the provided delay', async () => {
      const resultPromise = sleep(STRING_DELAY, VALUE);
      jest.advanceTimersByTime(DELAY);
      const result = await resultPromise;
      expect(result).toBe(VALUE);
    });
  });

  describe('when provided a number', () => {
    it('should resolve after the provided delay', async () => {
      const resultPromise = sleep(DELAY, VALUE);
      jest.advanceTimersByTime(DELAY);
      const result = await resultPromise;
      expect(result).toBe(VALUE);
    });
  });
});


describe('rejectAfter', () => {
  const ERR = new Error('error');

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
});
