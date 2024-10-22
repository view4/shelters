import * as crypto from 'crypto';

export const handleHash = (str) => {
  const hasher = crypto.createHash('sha256');
  hasher.update(str);
  return hasher.digest('hex');
};
