import capitalize from '../capitalize';

test('capitalize returns a capitalized string', () => {
    expect(capitalize('hello')).toBe('Hello');
    expect(capitalize('hello world')).toBe('Hello world');
    expect(capitalize('hello_world')).toBe('Hello world');
    expect(capitalize('hello_world_')).toBe('Hello world ');
    expect(capitalize('hello_world_123')).toBe('Hello world 123');
    expect(capitalize('HELLO')).toBe('HELLO');
});