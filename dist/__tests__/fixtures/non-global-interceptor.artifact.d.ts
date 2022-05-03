import { Interceptor, InvocationContext, InvocationResult, Provider, ValueOrPromise } from '@loopback/core';
/**
 * This class will be bound to the application as a global `Interceptor` during
 * `boot`
 */
export declare class MyInterceptor implements Provider<Interceptor> {
    /**
     * This method is used by LoopBack context to produce an interceptor function
     * for the binding.
     *
     * @returns An interceptor function
     */
    value(): (invocationCtx: InvocationContext, next: () => any) => Promise<any>;
    /**
     * The logic to intercept an invocation
     * @param invocationCtx - Invocation context
     * @param next - A function to invoke next interceptor or the target method
     */
    intercept(invocationCtx: InvocationContext, next: () => ValueOrPromise<InvocationResult>): Promise<any>;
}
