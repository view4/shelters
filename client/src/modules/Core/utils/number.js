export const randomise = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
export const randomiseFloat = (min, max) => Math.random() * (max - min) + min;