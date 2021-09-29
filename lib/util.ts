/**
 * @param ms Milliseconds to wait before resolve
 * @returns Resolved promise
 */
export const sleep = <T>(ms: number) => new Promise<T>((resolve) => setTimeout(resolve, ms));

export const removeTrailingSlash = (str: string): string => (str.endsWith('/') ? str.slice(0, -1) : str);

export const createAbsolutePath = (cwd: string, path: string) => {
  if (path.startsWith('/')) {
    return path;
  }

  if (path.includes('..')) {
    const pathSegments = (cwd + '/' + path).split('/');
    const idx = pathSegments.findIndex((item) => item === '..');

    if (idx > 0) {
      pathSegments.splice(idx - 1, idx);
      return pathSegments.join('/');
    }
  }

  return removeTrailingSlash(cwd + '/' + path);
};
