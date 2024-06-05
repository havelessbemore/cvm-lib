import { describe, expect, jest, test } from "@jest/globals";

import { Estimator } from "./estimator";
import { EstimatorConfig } from "./estimatorConfig";

describe(`${Estimator.name}`, () => {
  describe(`.capacity`, () => {
    test("should return the correct capacity when initialized", () => {
      const cvm = new Estimator<number>(10);
      expect(cvm.capacity).toBe(10);
    });

    test("should maintain the correct capacity after adding elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.capacity).toBe(10);
    });

    test("should maintain the correct capacity after clearing elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.clear();
      expect(cvm.capacity).toBe(10);
    });

    test("should maintain the correct capacity after multiple operations", () => {
      const cvm = new Estimator<number>(10);
      for (let i = 0; i < 20; i++) {
        cvm.add(i);
      }
      cvm.clear();
      for (let i = 0; i < 5; i++) {
        cvm.add(i);
      }
      expect(cvm.capacity).toBe(10);
    });
  });

  describe(`.sampleRate`, () => {
    test("should return the correct sampleRate when initialized", () => {
      const cvm = new Estimator<number>(10);
      expect(cvm.sampleRate).toBe(0.5);
    });

    test("should maintain the correct sampleRate after adding elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.sampleRate).toBe(0.5);
    });

    test("should maintain the correct sampleRate after clearing elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.clear();
      expect(cvm.sampleRate).toBe(0.5);
    });

    test("should maintain the correct sampleRate after multiple operations", () => {
      const cvm = new Estimator<number>(10);
      for (let i = 0; i < 20; i++) {
        cvm.add(i);
      }
      cvm.clear();
      for (let i = 0; i < 5; i++) {
        cvm.add(i);
      }
      expect(cvm.sampleRate).toBe(0.5);
    });

    test("should use default sampleRate if not provided in config", () => {
      const config = { capacity: 10, randomFn: Math.random };
      const cvm = new Estimator<number>(config);
      expect(cvm.sampleRate).toBe(0.5);
    });

    test("should handle edge case with zero probability gracefully", () => {
      const config = {
        capacity: 10,
        sampleRate: 0,
        randomFn: Math.random,
      };
      expect(() => new Estimator<number>(config)).toThrow(RangeError);
    });

    test("should handle edge case with one probability gracefully", () => {
      const config: EstimatorConfig = {
        capacity: 10,
        sampleRate: 1,
        randomFn: Math.random,
      };
      expect(() => new Estimator<number>(config)).toThrow(RangeError);
    });
  });

  describe(`.randomFn`, () => {
    test("should return the correct random function when initialized", () => {
      const cvm = new Estimator<number>(10);
      expect(cvm.randomFn).toBe(Math.random);
    });

    test("should return the default random function if none is provided", () => {
      const config = { capacity: 10, sampleRate: 0.5 };
      const cvm = new Estimator<number>(config);
      expect(cvm.randomFn).toBe(Math.random);
    });

    test("should return the custom random function if provided", () => {
      const customRandomFn = () => 0.5;
      const config: EstimatorConfig = {
        capacity: 10,
        sampleRate: 0.5,
        randomFn: customRandomFn,
      };
      const customRandomFnCvm = new Estimator<number>(config);
      expect(customRandomFnCvm.randomFn).toBe(customRandomFn);
    });

    test("should use the custom random function for sampling", () => {
      const mockRandomFn = jest.fn<() => number>().mockReturnValue(0.1);
      const config: EstimatorConfig = {
        capacity: 10,
        sampleRate: 0.5,
        randomFn: mockRandomFn,
      };
      const customRandomFnCvm = new Estimator<number>(config);

      customRandomFnCvm.add(1);
      expect(mockRandomFn).toHaveBeenCalled();
    });
  });

  describe(`.size`, () => {
    test("should return the correct size when no elements are added", () => {
      const cvm = new Estimator<number>(10);
      expect(cvm.size).toBe(0);
    });

    test("should return the correct size after adding elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.size).toBe(2);
    });

    test("should return the correct size after clearing elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.size).toBe(2);
      cvm.clear();
      expect(cvm.size).toBe(0);
    });

    test("should not exceed capacity", () => {
      const cvm = new Estimator<number>(10);
      for (let i = 0; i < 20; i++) {
        cvm.add(i);
      }
      expect(cvm.size).toBeLessThan(cvm.capacity);
    });

    test("should reflect the correct size after multiple additions and deletions", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.add(3);
      cvm.add(4);
      expect(cvm.size).toBe(4);

      cvm.add(5);
      cvm.add(6);
      cvm.add(7);
      expect(cvm.size).toBe(7);

      cvm.clear();
      expect(cvm.size).toBe(0);

      cvm.add(8);
      cvm.add(9);
      expect(cvm.size).toBe(2);
    });

    test("should correctly update size after hitting capacity and adjusting sample rate", () => {
      const mockRandomFn = jest
        .fn<() => number>()
        .mockReturnValueOnce(0.1) // Add 1
        .mockReturnValueOnce(0.2) // Add 2
        .mockReturnValueOnce(0.3) // Add 3 (triggers reduction)
        .mockReturnValueOnce(1.0) // Remove 1
        .mockReturnValueOnce(1.0) // Remove 2
        .mockReturnValueOnce(0.1) // Keep 3
        .mockReturnValue(0.1); // Continue to add

      const cvm = new Estimator<number>({
        capacity: 3,
        randomFn: mockRandomFn,
      });
      for (let i = 1; i <= 4; ++i) {
        cvm.add(i);
      }

      expect(cvm.size).toBeLessThan(cvm.capacity);
    });
  });

  describe(`${Estimator.prototype.add.name}()`, () => {
    test("should add elements correctly", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.size).toBe(2);
    });

    test("should not add an element if the random function exceeds the sample rate", () => {
      const mockRandomFn = jest.fn<() => number>().mockReturnValue(1.1);
      const config = { capacity: 10, sampleRate: 0.5, randomFn: mockRandomFn };
      const cvm = new Estimator<number>(config);

      cvm.add(1);
      expect(cvm.size).toBe(0);
    });

    test("should handle adding elements after capacity is reached", () => {
      const mockRandomFn = jest.fn<() => number>().mockReturnValue(0.9);
      const config = { capacity: 3, sampleRate: 0.5, randomFn: mockRandomFn };
      const cvm = new Estimator<number>(config);
      cvm.add(1);
      cvm.add(2);
      cvm.add(3);
      cvm.add(4);
      expect(cvm.size).toBeLessThan(3);
    });

    test("should adjust sample rate and reduce sample size when capacity is exceeded", () => {
      const mockRandomFn = jest
        .fn<() => number>()
        .mockReturnValueOnce(0.1) // Add 1
        .mockReturnValueOnce(0.2) // Add 2
        .mockReturnValueOnce(0.1) // Add 3
        .mockReturnValue(0.9); // Do not add any more

      const config = { capacity: 3, sampleRate: 0.5, randomFn: mockRandomFn };
      const cvm = new Estimator<number>(config);

      for (let i = 1; i <= 4; i++) {
        cvm.add(i);
      }

      expect(cvm.size).toBeLessThan(3);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((cvm as any)._rate).toBeLessThan(1);
    });

    test("should handle duplicate values correctly", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(1);
      expect(cvm.size).toBe(1);
    });

    test("should return the CVM instance after adding an element", () => {
      const cvm = new Estimator<number>(10);
      const returnValue = cvm.add(1);
      expect(returnValue).toBe(cvm);
    });

    test("should remove elements not sampled", () => {
      const mockRandomFn = jest
        .fn<() => number>()
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.1)
        .mockReturnValueOnce(0.1)
        .mockReturnValue(0.9);
      const config = { capacity: 3, sampleRate: 0.5, randomFn: mockRandomFn };
      const cvm = new Estimator<number>(config);
      cvm.add(1); // Should not be added
      cvm.add(2); // Should be added
      cvm.add(3); // Should be added
      expect(cvm.size).toBe(0);
    });
  });

  describe(`${Estimator.prototype.clear.name}()`, () => {
    test("should reset the sample rate to 1", () => {
      const cvm = new Estimator<number>({ capacity: 2 });
      for (let i = 0; i < 4; ++i) {
        cvm.add(i);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((cvm as any)._rate).toBeLessThan(1);
      cvm.clear();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((cvm as any)._rate).toBe(1);
    });

    test("should clear all samples", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      expect(cvm.size).toBeGreaterThan(0);
      cvm.clear();
      expect(cvm.size).toBe(0);
    });

    test("should clear samples and reset sample rate correctly after multiple additions", () => {
      const cvm = new Estimator<number>(10);
      for (let i = 0; i < 20; i++) {
        cvm.add(i);
      }
      expect(cvm.size).toBeLessThan(cvm.capacity);
      cvm.clear();
      expect(cvm.size).toBe(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((cvm as any)._rate).toBe(1);
    });

    test("should maintain correct state after clear and re-add", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.clear();
      cvm.add(3);
      expect(cvm.size).toBe(1);
    });

    test("should handle clear on an already empty CVM", () => {
      const cvm = new Estimator<number>(10);
      cvm.clear();
      expect(cvm.size).toBe(0);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((cvm as any)._rate).toBe(1);
    });
  });

  describe(`${Estimator.prototype.estimate.name}()`, () => {
    test("should return 0 when no elements have been added", () => {
      const cvm = new Estimator<number>(10);
      expect(cvm.estimate()).toBe(0);
    });

    test("should return the correct estimate for added elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.add(3);
      expect(cvm.estimate()).toBe(3);
    });

    test("should return the correct estimate after clearing elements", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.clear();
      expect(cvm.estimate()).toBe(0);
    });

    test("should handle duplicate values correctly in estimate", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(1);
      expect(cvm.estimate()).toBe(1);
    });

    test("should provide a valid estimate after multiple operations", () => {
      const cvm = new Estimator<number>(10);
      cvm.add(1);
      cvm.add(2);
      cvm.add(3);
      cvm.add(4);
      cvm.clear();
      cvm.add(5);
      cvm.add(6);
      expect(cvm.estimate()).toBe(2);
    });
  });
});
