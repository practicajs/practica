import isCI from 'is-ci';
import dockerCompose from 'docker-compose';

export default async () => {
  if (isCI) {
    // ️️️✅ Best Practice: Leave the DB up in dev environment
    dockerCompose.down();
  }
};
