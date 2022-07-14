import sinon from 'sinon'
import { logger } from '../logger.wrapper'

beforeAll(() => {})

beforeEach(() => {
  sinon.restore()
  logger.resetLogger()
})

describe('logger', () => {
  test('When no explicit configuration is set, info logs are written', async () => {
    // Arrange
    const stdoutStub = sinon.stub(process.stdout, 'write')

    // Act
    logger.info('This is an info message')

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    })
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg)
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' })
  })

  test('When log level is DEBUG and logger emits INFO statement, then stdout contains the entry', async () => {
    // Arrange
    logger.configureLogger({ level: 'debug' }, true)
    const stdoutStub = sinon.stub(process.stdout, 'write')

    // Act
    logger.info('This is an info message')

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    })
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg)
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' })
  })

  test('When logger is configured and then re-configured, then the new config applies', async () => {
    // Arrange
    logger.configureLogger({ level: 'info' }, true)
    logger.configureLogger({ level: 'debug' }, true)
    const stdoutStub = sinon.stub(process.stdout, 'write')

    // Act
    logger.debug('This is an info message')

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    })
    const lastStdoutCall = JSON.parse(stdoutStub.lastCall?.firstArg)
    expect(lastStdoutCall).toMatchObject({ msg: 'This is an info message' })
  })

  test('When log level is ERROR and logger emits INFO statement, then nothing is written', async () => {
    // Arrange
    logger.configureLogger({ level: 'error' }, true)
    const stdoutStub = sinon.stub(process.stdout, 'write')

    // Act
    logger.info('This is an info message')

    // Assert
    expect(stdoutStub.callCount).toBe(0)
  })

  test('When configuring for pretty-print, then its written to stdout', async () => {
    // Arrange
    logger.configureLogger({ level: 'info', prettyPrint: true }, true)
    const stdoutStub = sinon.stub(process.stdout, 'write')

    // Act
    logger.info('This is an info message')

    // Assert
    expect({ stdCallCount: stdoutStub.callCount }).toMatchObject({
      stdCallCount: 1,
    })
  })
})
