import { Prisma } from '@prisma/client';

export function bigIntMiddleware(): Prisma.Middleware {
  return async (params, next) => {
    const result = await next(params);

    return JSON.parse(
      JSON.stringify(result, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
    );
  };
}
