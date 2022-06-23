// This file simulates real-world error handler that makes this component observable
const errorHandler = {
  handleError: async (errorToHandle) => {
    try {
      console.error(errorToHandle);
    } catch (e) {
      // Continue the code flow if failed to handle the error
      console.log(`handleError threw an error ${e}`);
    }
  },
};

class AppError extends Error {
  constructor(name, message) {
    super(message);
    this.name = name;
  }
}

export { errorHandler, AppError };
