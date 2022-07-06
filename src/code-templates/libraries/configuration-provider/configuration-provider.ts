// @ts-nocheck
import convict from "convict";

let convictConfigurationProvider: convict.Config<any> = undefined;

export function initialize(schema) {
  convictConfigurationProvider = convict(schema);
  convictConfigurationProvider.validate();
}

// Meant mostly for testing purposes, to allow resetting the state between tests
export function reset() {
  convictConfigurationProvider = undefined;
}

export function getValue(keyName) {
  if (convictConfigurationProvider === undefined) {
    throw new Error("Configuration has not been initialized yet");
  }
  return convictConfigurationProvider.get(keyName);
}
