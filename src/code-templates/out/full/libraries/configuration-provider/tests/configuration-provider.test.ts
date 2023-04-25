import * as configurationProvider from '../index';

describe('getValue function', () => {
  beforeEach(() => {
    configurationProvider.reset();
  });
  test('When a default value exist in the schema, then get this value in response', () => {
    // Arrange
    configurationProvider.initializeAndValidate({
      port: {
        format: 'Number',
        default: 3000,
      },
    });

    // Act
    const receivedValue = configurationProvider.getValue('port');

    // Assert
    expect(receivedValue).toBe(3000);
  });

  test('When a key does not exist, then an exception should be thrown', () => {
    // Arrange
    configurationProvider.initializeAndValidate({
      port: {
        format: 'Number',
      },
    });

    // Act
    const functionUnderTest = configurationProvider.getValue.bind(
      null,
      'none-existing-key'
    );

    // Assert
    expect(functionUnderTest).toThrow();
  });

  test('When there is default but ENV VAR override exists, then the ENV VAR value is returned', () => {
    // Arrange
    process.env.LOGGER_LEVEL = 'the-new-value';
    configurationProvider.initializeAndValidate({
      logLevel: {
        format: 'String',
        default: 'the-default-value',
        env: 'LOGGER_LEVEL',
      },
    });

    // Act
    const receivedValue = configurationProvider.getValue('logLevel');

    // Assert
    expect(receivedValue).toBe('the-new-value');

    // Cleanup
    delete process.env.LOGGER_LEVEL;
  });

  test('When trying to get before initializing, then an exception should be thrown', () => {
    // Arrange
    // No initialization

    // Act
    const functionUnderTest = configurationProvider.getValue.bind(
      null,
      'existing-key'
    );

    // Assert
    expect(functionUnderTest).toThrow();
  });
});

describe('initialize function', () => {
  test('When initializing without config data, then an exception should be thrown', () => {
    expect(
      configurationProvider.initializeAndValidate.bind(null, null)
    ).toThrow();
  });

  test('When a non-null key without default value is null, then an exception should be thrown', () => {
    // Arrange
    const configWithNullMandatoryKey = {
      port: {
        format: 'Number',
        nullable: false,
        default: null,
      },
    };

    // Act
    const functionUnderTest = configurationProvider.initializeAndValidate.bind(
      null,
      configWithNullMandatoryKey
    );

    // Assert
    expect(functionUnderTest).toThrow();
  });

  test('When a numerical value has string, then an exception should be thrown', () => {
    // Arrange
    process.env.PORT = 'Im-a-string-not-number';
    const configWithTypeMismatch = {
      port: {
        format: 'int',
        env: 'PORT',
        default: null,
      },
    };

    // Act
    const functionUnderTest = configurationProvider.initializeAndValidate.bind(
      null,
      configWithTypeMismatch
    );

    // Assert
    expect(functionUnderTest).toThrow();

    // Clean-up
    delete process.env.PORT;
  });
});
