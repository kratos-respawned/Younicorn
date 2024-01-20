export const errorPromise = (
  message: string
): Promise<{
  output: string;
  message: string;
  name: string;
  code: 0;
}> => {
  return new Promise((resolve, reject) => {
    resolve({
      output: "error",
      message: message,
      name: "name",
      code: 0,
    });
  });
};
