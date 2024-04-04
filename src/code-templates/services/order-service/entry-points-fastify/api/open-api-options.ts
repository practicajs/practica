export const OpenAPIOptions = {
  openapi: {
    info: {
      title: 'Order service',
      description: 'The order service API ',
      version: '0.8.0',
    },
    tags: [{ name: 'v0.8', description: 'Current version in production' }],
  },
};

export const OpenAPIUIOptions = {
  routePrefix: '/docs',
  exposeRoute: true,
};
