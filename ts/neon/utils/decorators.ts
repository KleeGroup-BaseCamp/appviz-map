export function PushPop(target: Object, propertyKey: string, descriptor: PropertyDescriptor) {
    // keep a reference to the original function
    const originalFunction = descriptor.value;

    // Replace the original function with a wrapper
    descriptor.value = function (...args: any[]) {
        push()
        // Call the original function
        const result = originalFunction.apply(this, args);
        pop()
        return result;
    }
}
