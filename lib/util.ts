/**
 * @param ms Milliseconds to wait before resolve
 * @returns Resolved promise
 */
export const sleep = <T>(ms: number) => new Promise<T>((resolve) => setTimeout(resolve, ms));
