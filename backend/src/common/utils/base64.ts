export const base64ToBuffer = (base64: string) => {
    const binary = atob(base64.split(',').pop());
    return Buffer.from(binary, 'binary');
  };