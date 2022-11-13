import AJV from 'ajv';

// This file is used to provide a 'singleton' AJV instance for the entire app so
// every client can cache the compiled schemas

const ajv = new AJV();
ajv.addKeyword('kind');
ajv.addKeyword('modifier');

export default ajv;
