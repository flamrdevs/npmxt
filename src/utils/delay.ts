export const delay = (ms = 1000) => new Promise<void>((resolve) => setTimeout(resolve, ms));
