import sinon from 'sinon';
import { Server } from 'http';
import { logger } from '@practica/logger';
import { AppError, errorHandler } from '..';

beforeEach(() => {
  sinon.restore();
});

describe('handleError', () => {
  test('When uncaughtException emitted, error handled should catch and handle the error properly', () => {
    // Arrange
    const httpServerMock = sinon.createStubInstance(Server);
    const loggerStub = sinon.stub(logger, 'error');
    errorHandler.listenToErrorEvents(httpServerMock);
    const errorName = 'mocking an uncaught exception';
    const errorToEmit = new Error(errorName);

    // Act
    process.emit('uncaughtException', errorToEmit);

    // Assert
    expect(loggerStub).sinonToBeCalledTimes(1);
    expect(loggerStub).sinonToBeCalledWith(
      errorToEmit.message,
      expect.objectContaining({
        name: errorToEmit.name,
        message: errorToEmit.message,
        stack: expect.any(String),
      })
    );
  });

  test('When handling an Error instance, should log an AppError instance after receiving an Error instance', () => {
    // Arrange
    const errorToHandle = new Error('mocking pre-known error');
    const loggerStub = sinon.stub(logger, 'error');

    // Act
    errorHandler.handleError(errorToHandle);

    // Assert
    expect(loggerStub).sinonToBeCalled();
    expect(loggerStub).sinonToBeCalledWith(
      expect.any(String),
      expect.any(AppError)
    );
  });

  test('When handling AppError, then all the important properties are passed to the logger', () => {
    // Arrange
    const errorToHandle = new AppError(
      'invalid-input',
      'missing important field',
      400,
      true
    );
    const loggerListener = sinon.stub(logger, 'error');

    // Act
    errorHandler.handleError(errorToHandle);

    // Assert
    expect(loggerListener).sinonToBeCalledTimes(1);
    expect(loggerListener).sinonToBeCalledWith(
      'missing important field',
      expect.objectContaining({
        name: 'invalid-input',
        HTTPStatus: 400,
        message: 'missing important field',
        isTrusted: true,
        stack: expect.any(String),
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
    'When handling an Error instance, should log an AppError instance after receiving unknown error of multiple types',
    (unknownErrorValue) => {
      // Arrange
      const loggerStub = sinon.stub(logger, 'error');

      // Act
      errorHandler.handleError(unknownErrorValue);

      // Assert
      expect(loggerStub).sinonToBeCalledTimes(1);

      const message = loggerStub.firstCall.args[0];
      expect(message.includes(typeof unknownErrorValue)).toBe(true);

      const appError = loggerStub.firstCall.args[1];
      expect((appError as AppError).name).toBe('general-error');
    }
  );
});
