import { logger } from '@practica/logger';
import * as http from 'node:http';
import { AppError } from '../app-error';
import { errorHandler } from '../error-handler';

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(process, 'exit').mockImplementation();
});

describe('Error handler', () => {
  describe('Listen to error events', () => {
    test('When uncaughtException emitted, error handled should catch and handle the error properly', () => {
      // Arrange
      const loggerStub = jest.spyOn(logger, 'error').mockImplementation();
      errorHandler.listenToErrorEvents({
        close: jest.fn(),
      } as unknown as http.Server);
      const errorName = 'mocking an uncaught exception';
      const errorToEmit = new Error(errorName);

      // Act
      process.emit('uncaughtException', errorToEmit);

      // Assert
      expect(loggerStub).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          name: errorToEmit.name,
          message: errorToEmit.message,
          stack: expect.any(String),
          HTTPStatus: 500,
          isCatastrophic: true,
        })
      );
    });
  });

  describe('Handle error', () => {
    test('When passing standard AppError object, then all the important properties are passed to the logger', () => {
      // Arrange
      const errorToHandle = new AppError(
        'invalid-input',
        'missing important field',
        400,
        true
      );
      const loggerListener = jest
        .spyOn(logger, 'error')
        .mockImplementation(() => {});

      // Act
      errorHandler.handleError(errorToHandle);

      // Assert
      expect(loggerListener).toHaveBeenCalledWith(
        'missing important field',
        expect.objectContaining({
          name: 'invalid-input',
          HTTPStatus: 400,
          message: 'missing important field',
          isCatastrophic: true,
          stack: expect.any(String),
        })
      );
    });

    test('When receiving extra custom properties, then standard properties and extra properties are logged', () => {
      // Arrange
      const errorToHandle = { status: 409, customProperty: 'customValue' };
      const loggerListener = jest
        .spyOn(logger, 'error')
        .mockImplementation(() => {});

      // Act
      errorHandler.handleError(errorToHandle);

      // Assert
      expect(loggerListener).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          name: expect.any(String),
          HTTPStatus: 409,
          message: expect.any(String),
          customProperty: 'customValue',
          isCatastrophic: true,
        })
      );
    });

    test.each([
      1,
      'oops, this error is actually a string!',
      null,
      Infinity,
      false,
      { someKey: 'someValue' },
      [],
      undefined,
      NaN,
      '🐥',
      () => undefined,
    ])(
      'When receiving non standard Error input, then calling the logger with all the mandatory properties',
      (unknownErrorValue) => {
        // Arrange
        const loggerStub = jest.spyOn(logger, 'error');
        // Act
        errorHandler.handleError(unknownErrorValue);
        // Assert
        expect(loggerStub).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({
            name: 'unknown-error',
            HTTPStatus: 500,
            isCatastrophic: true,
          })
        );
      }
    );
  });
});
