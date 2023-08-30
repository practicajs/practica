import inspector from 'node:inspector'

if (inspector.url()) {
  jest.setTimeout(100_000)
}