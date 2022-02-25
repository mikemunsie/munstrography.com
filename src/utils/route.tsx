import { RoutePaths } from "../routes/paths";

export type ExtractRouteParams<T> = string extends T
  ? Record<string, string>
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends `${infer _Start}:${infer Param}/${infer Rest}`
  ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
  : // eslint-disable-next-line @typescript-eslint/no-unused-vars
  T extends `${infer _Start}:${infer Param}`
  ? { [k in Param]: string }
  : undefined;

export type PathParams<P extends RoutePaths> = ExtractRouteParams<P>;

/**
 * Build a url with a path and its parameters.
 * @example
 * buildUrl(
 *   '/a/:first/:last',
 *   { first: 'p', last: 'q' },
 * ) // returns '/a/p/q'
 * @param path target path.
 * @param params parameters.
 */
export const route = <P extends RoutePaths>(
  path: P,
  ...params: PathParams<P> extends Record<string, string> ? [PathParams<P> | false] : [undefined?]
) => {
  if ((params as any) === false) return path;
  let ret = `${path}`;
  const paramObj: { [i: string]: string } = (params[0] || {}) as any;
  Object.keys(paramObj).forEach((key) => {
    ret = ret.replace(`:${key}`, paramObj[key]);
  });
  return ret as RoutePaths;
};
