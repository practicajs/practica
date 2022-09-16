import { AsyncLocalStorage } from 'node:async_hooks';

import { context } from '../index';

describe('async-local-storage', () => {
    test('should return AsyncLocalStorage', () => {
        // Act
        const als = context();

        // Assert
        expect(als).toBeInstanceOf(AsyncLocalStorage)
    });

    test('should return the same AsyncLocalStorage instance between calls', () => {
        // Act
        const alsCall1 = context();
        const alsCall2 = context();

        // Assert
        expect(alsCall1).toBe(alsCall2)
    });
});
