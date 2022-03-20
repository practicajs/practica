// This is not a real logger as its just writes to the console
// but it has the structure of a real logger

export const info = (message) => {
  console.log(message);
};

export const error = (message) => {
  console.error(message);
};
