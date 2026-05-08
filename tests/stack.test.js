const stack = require('../src/stack');

test('peek on empty stack returns undefined', () => {
    expect(stack.peek()).toBeUndefined();
});

test('peek on stack with one element returns that element', () => {
    stack.push(1);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(1);
});

test('peek on stack with two or more elements returns the top element', () => {
    stack.push(1);
    stack.push("wow");
    stack.push(42);
    expect(stack.peek()).toBeDefined();
    expect(stack.peek()).toBe(42);
});

/*
Testar längden på stacken efter en push
Av:     Martin Frick 
Datum:  260508
*/
test('perform push on stack, verify length of stack is is correctly incremented', () => {

    const oldLng = stack.length() + 5;
    stack.push("wow2");

    expect(stack.length()).toBe(oldLng+1);
});