import sinon from 'sinon';
import { context } from '@practica/global-context';
import { logger } from '../index';

describe('logger', () => {
  beforeEach(() => {
    sinon.restore();
    logger.resetLogger();
  });

  test('When no explicit configuration is set, info logs are written', async () => {
    // Arrange
    // Must stub the process.stdout before we configure the logger (this is also true for the rest of the tests)
    // as it would fail when the underlying logger is pino, and we run in WebStorm
    // See more here - practicajs/practica#225
    const stdoutStub = sinon.stub(process.stdout, 'write');

    // Act
    logger.info('This is an info message');

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    });
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is DEBUG and logger emits INFO statement, then stdout contains the entry', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'debug' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    });
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When logger is configured and then re-configured, then the new config applies', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'info' }, true);
    logger.configureLogger({ level: 'debug' }, true);

    // Act
    logger.debug('This is an info message');

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    });
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is ERROR and logger emits INFO statement, then nothing is written', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'error' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 0,
    });
  });

  test('When configuring for pretty-print, then its written to stdout', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'info', prettyPrint: false }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    });
  });

  test('it should print the passed metadata', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'info' }, true);
    const objectToPrint = { custom: 'I love you 3000' };

    // Act
    logger.info('This is an info message', objectToPrint);

    // Assert
    expect(stdoutStub.callCount).toEqual(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
    expect(lastStdoutCall).toMatchObject({
      msg: 'This is an info message',
      ...objectToPrint,
    });
  });

  describe('context', () => {
    test('it should print the current context', () => {
      // Arrange
      const stdoutStub = sinon.stub(process.stdout, 'write');
      const currentContext = {
        requestId: 'my-request-id',
      };

      // Act
      context().run(currentContext, () => {
        logger.info('This is an info message');
      });

      // Assert
      expect(stdoutStub.callCount).toEqual(1);
      const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
      expect(lastStdoutCall).toMatchObject({
        ...currentContext,
        msg: 'This is an info message',
      });
    });

    test('it should merge with current context', () => {
      // Arrange
      const stdoutStub = sinon.stub(process.stdout, 'write');
      const currentContext = {
        requestId: 'my-request-id',
      };

      // Act
      context().run(currentContext, () => {
        logger.info('This is an info message', { userId: 1 });
      });

      // Assert
      expect(stdoutStub.callCount).toEqual(1);
      const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
      expect(lastStdoutCall).toMatchObject({
        ...currentContext,
        msg: 'This is an info message',
        userId: 1,
      });
    });

    test('it should override current context', () => {
      // Arrange
      const stdoutStub = sinon.stub(process.stdout, 'write');
      const currentContext = {
        requestId: 'my-request-id',
        userId: 1,
      };

      // Act
      context().run(currentContext, () => {
        logger.info('This is an info message', { userId: 2 });
      });

      // Assert
      expect(stdoutStub.callCount).toEqual(1);
      const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
      expect(lastStdoutCall).toMatchObject({
        msg: 'This is an info message',
        requestId: 'my-request-id',
        userId: 2,
      });
    });
  });
});
