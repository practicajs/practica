import sinon from 'sinon';
import { logger } from '../index';

beforeEach(() => {
  sinon.restore();
  logger.resetLogger();
});

describe('logger', () => {
  test('When no explicit configuration is set, info logs are written', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub).sinonToBeCalledTimes(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is DEBUG and logger emits INFO statement, then stdout contains the entry', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'debug' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub).sinonToBeCalledTimes(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
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
    expect(stdoutStub).sinonToBeCalledTimes(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is ERROR and logger emits INFO statement, then nothing is written', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'error' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub).not.sinonToBeCalled();
  });

  test('When configuring for pretty-print, then its written to stdout', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'info', prettyPrint: false }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub).sinonToBeCalledTimes(1);
  });

  test('it should print the passed metadata', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write');
    logger.configureLogger({ level: 'info' }, true);
    const objectToPrint = { custom: 'I love you 3000' };

    // Act
    logger.info('This is an info message', objectToPrint);

    // Assert
    expect(stdoutStub).sinonToBeCalledTimes(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg);
    expect(lastStdoutCall).toMatchObject({
      msg: 'This is an info message',
      ...objectToPrint,
    });
  });
});
