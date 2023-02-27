import { Prisma } from '@prisma/client'
import { hashPassword } from 'src/utils';

export function HashUserPasswordMiddleware<T extends Prisma.BatchPayload = Prisma.BatchPayload>(): Prisma.Middleware {
    return async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<T>): Promise<T> => {
        if (params.model === 'User' && params.action === 'createMany') {
            const { args: { data } } = params
            Object.assign(data, { ...data, password: await hashPassword(data.password) })
        }
        return next(params)
    };
}