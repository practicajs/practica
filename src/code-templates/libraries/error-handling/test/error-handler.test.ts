import sinon from 'sinon';
import { Server } from 'http';
import * as logger from "@practica/logger";
import { AppError, errorHandler } from '../error-handling';

beforeEach(() => {
    sinon.restore();
});

describe('Error Handler', () => {
    test('When uncaughtException emitted, error handled should catch and handle the error properly', () => {
        // Arrange
        const httpServerMock = { close: () => {} } as Server
        const loggerStub = sinon.stub(logger, 'error')
        errorHandler.listenToErrorEvents(httpServerMock)
        const errorToEmit = new Error('mocking an uncaught exception')
        // Act
        process.emit('uncaughtException', errorToEmit)
        const relevantArguments = loggerStub.firstCall.args[0]
        // Assert
        expect(loggerStub.callCount).toBe(1)
        expect(relevantArguments instanceof AppError).toBe(true)
        expect(relevantArguments.name).toBe(errorToEmit.name)
        expect(relevantArguments.message).toBe(errorToEmit.message)
    })

    test('Handle Error - handling Error instance, should log an AppError instance after receiving an Error instance', () => {
        // Arrange
        const loggerStub = sinon.stub(logger, 'error')
        const errorToHandle = new Error('mocking pre-known error')
        // Act
        errorHandler.handleError(errorToHandle)
        const relevantArguments = loggerStub.firstCall.args[0]
        // Assert
        expect(loggerStub.callCount).toBe(1)
        expect(relevantArguments instanceof AppError).toBe(true)
        expect(relevantArguments.name).toBe(errorToHandle.name)
        expect(relevantArguments.message).toBe(errorToHandle.message)
    })

    test('Handle Error - handling Error instance, should log an AppError instance after receiving a string', () => {
        // Arrange
        const loggerStub = sinon.stub(logger, 'error')
        const errorToHandle = 'oops, this error is actually a string!'
        // Act
        errorHandler.handleError(errorToHandle)
        const relevantArguments = loggerStub.firstCall.args[0]
        // Assert
        expect(loggerStub.callCount).toBe(1)
        expect(relevantArguments instanceof AppError).toBe(true)
        expect(relevantArguments.name).toBe('general-error')
        expect(relevantArguments.message.includes(errorToHandle)).toBe(true)
    })
})