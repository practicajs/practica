import isCI from "is-ci";
import dockerCompose from "docker-compose";
import * as orderRepository from "../data-access/repositories/order-repository";

module.exports = async () => {
  if (isCI) {
    // ️️️✅ Best Practice: Leave the DB up in dev environment
    dockerCompose.down();
  } else {
    // ✅ Best Practice: Clean the database occasionally after all suites - having data in DB makes the test more realistic
    // Cleaning beforeEach will complicates multi-process mode and troubleshooting the data in the DB
    if (Math.ceil(Math.random() * 10) === 10) {
      await orderRepository.cleanupData();
    }
  }
};
