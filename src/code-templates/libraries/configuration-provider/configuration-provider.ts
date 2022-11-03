/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/first */
// @ts-nocheck

// TODO: we need to change any to generic and accept the schema type from the consumer
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let convictConfigurationProvider: convict.Config<any> | undefined;

// eslint-disable-next-line import/first

import convict from 'convict';
import appConfig from './appConfig.ts';

export function initialize() {
  convictConfigurationProvider = convict(appConfig);
  convictConfigurationProvider.validate();
}

export function getValue(keyName: string): string {
  return convictConfigurationProvider.get(keyName);
}


// Meant mostly for testing purposes, to allow resetting the state between tests
export function reset() {
  convictConfigurationProvider = undefined;
}

class foo {
  loo(){
    const config =  {
      jwtTokenSecret: {
        doc: 'The JWT token signing algorithm secret',
        format: 'String',
        default: 'just-a-default-secret',
        nullable: false,
        env: 'JWT_TOKEN_SECRET',
      },
      port: {
        doc: 'The API listening port. By default is 0 (ephemeral) which serves as a dynamic port for testing purposes. For production use, a specific port must be assigned',
        format: 'Number',
        default: 0,
        nullable: true,
        env: 'PORT',
      },
  }

  const configProvider = convict(config);


  const port = configProvider.get("port");
  console.log(port);

  
}

