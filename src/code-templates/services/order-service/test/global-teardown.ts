import isCI from "is-ci";
import dockerCompose from "docker-compose";
import OrderRepository from "../data-access/order-repository";

module.exports = async () => {
  if (isCI) {
    // ️️️✅ Best Practice: Leave the DB up in dev environment
    dockerCompose.down();
  } else {
    // ✅ Best Practice: Clean the database occasionally
    if (Math.ceil(Math.random() * 10) === 10) {
      await new OrderRepository().cleanup();
    }
  }
};
