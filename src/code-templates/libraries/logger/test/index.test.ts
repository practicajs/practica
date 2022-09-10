import sinon from 'sinon';
import { logger } from '../index';

beforeEach(() => {
  sinon.restore();
  logger.resetLogger();
});

describe('logger', () => {
  let stdoutStub: sinon.SinonStubbedMember<typeof process['stdout']['write']>;

  beforeEach(() => {
    // Must stub the process.stdout before we configure the logger
    // as it would fail when the underlying logger is pino, and we run in WebStorm
    // See more here - practicajs/practica#225
    stdoutStub = sinon.stub(process.stdout, 'write');
  });

  test('When no explicit configuration is set, info logs are written', async () => {
    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub.callCount).toEqual(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is DEBUG and logger emits INFO statement, then stdout contains the entry', async () => {
    // Arrange
    logger.configureLogger({ level: 'debug' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub.callCount).toEqual(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When logger is configured and then re-configured, then the new config applies', async () => {
    // Arrange
    logger.configureLogger({ level: 'info' }, true);
    logger.configureLogger({ level: 'debug' }, true);

    // Act
    logger.debug('This is an info message');

    // Assert
    expect(stdoutStub.callCount).toEqual(1);
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall.firstArg);
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' });
  });

  test('When log level is ERROR and logger emits INFO statement, then nothing is written', async () => {
    // Arrange
    logger.configureLogger({ level: 'error' }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub.callCount).toEqual(0);
  });

  test('When configuring for pretty-print, then its written to stdout', async () => {
    // Arrange
    logger.configureLogger({ level: 'info', prettyPrint: false }, true);

    // Act
    logger.info('This is an info message');

    // Assert
    expect(stdoutStub.callCount).toEqual(1);
  });
});
