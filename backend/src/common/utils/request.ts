export const requestWrapper =
  (func, throwError) =>
  async (...args) => {
    try {
      return await func(...args);
    } catch (e) {
      const error = e?.response?.data ?? e?.response ?? e;
      console.log('Error:');
      console.log(error);
      if (throwError) throw error;
    }
  };
