---
title: Symbol 浅窥
description: Symbol 浅窥
date: 2023-01-01
tags:
  - node
---

## Symbol ??

❀❀ Symbol 是Javascript的原始数据类型之一，它表示一个唯一的、不可变的值，通常用作对象属性的键值。

## 属性

------

### Symbol.length

Symbol构造函数的length属性值为0。

```javascript
console.log(Symbol.length); 
// 0
```

## 方法

------

### Symbol()

Symbol()函数会返回一个新的、唯一的Symbol值。可以使用可选参数description来为Symbol值添加一个描述信息。

```javascript
const symbol1 = Symbol('foo');
const symbol2 = Symbol('foo');

console.log(symbol1 === symbol2); // false
```

使用场景： 当我们需要使用一个唯一的Symbol值时，可以使用Symbol()函数来创建该值。通常情况下，我们会将Symbol值用作对象属性的键值，以确保该属性不会被意外地覆盖或修改。

### Symbol.for()

Symbol.for()方法会根据给定的字符串key，返回一个已经存在的symbol值。如果不存在，则会创建一个新的Symbol值并将其注册到全局Symbol注册表中。

```js
const symbol1 = Symbol.for('foo');
const symbol2 = Symbol.for('foo');

console.log(symbol1 === symbol2); // true
```

使用场景： 当我们需要使用一个全局唯一的Symbol值时，可以使用Symbol.for()方法来获取或创建该值。例如，在多个模块之间共享某个Symbol值时，我们可以使用Symbol.for()来确保获取到的Symbol值是唯一的。

### Symbol.keyFor()

Symbol.keyFor()方法会返回一个已经存在的Symbol值的key。如果给定的Symbol值不存在于全局Symbol注册表中，则返回undefined。

```javascript
const symbol1 = Symbol.for('foo');
const key1 = Symbol.keyFor(symbol1);

const symbol2 = Symbol('bar');
const key2 = Symbol.keyFor(symbol2);

console.log(key1); // 'foo'
console.log(key2); // undefined
```

使用场景： 当我们需要获取一个全局唯一的Symbol值的key时，可以使用Symbol.keyFor()方法。但需要注意的是，只有在该Symbol值被注册到全局Symbol注册表中时，才能使用Symbol.keyFor()方法获取到其key。

### Symbol.prototype.toString()

Symbol.prototype.toString()方法会返回Symbol值的字符串表示形式，该表示形式包含Symbol()函数创建时指定的描述信息。

```typescript
const symbol = Symbol('foo');

console.log(symbol.toString()); // 'Symbol(foo)'
```

使用场景： 当我们需要将一个Symbol值转换成字符串时，可以使用Symbol.prototype.toString()方法。

### Symbol.prototype.valueOf()

Symbol.prototype.valueOf()方法会返回Symbol值本身。

```typescript
const symbol = Symbol('foo');

console.log(symbol.valueOf()); // Symbol(foo)
```

使用场景： 当我们需要获取一个Symbol值本身时，可以使用Symbol.prototype.valueOf()方法。

### Symbol.iterator

Symbol.iterator是一个预定义好的Symbol值，表示对象的默认迭代器方法。该方法返回一个迭代器对象，可以用于遍历该对象的所有可遍历属性。

```javascript
const obj = { a: 1, b: 2 };

for (const key of Object.keys(obj)) {
  console.log(key);
}
// Output:
// 'a'
// 'b'

for (const key of Object.getOwnPropertyNames(obj)) {
  console.log(key);
}
// Output:
// 'a'
// 'b'

for (const key of Object.getOwnPropertySymbols(obj)) {
  console.log(key);
}
// Output: 
// No output

obj[Symbol.iterator] = function* () {
  for (const key of Object.keys(this)) {
    yield key;
  }
}

for (const key of obj) {
  console.log(key);
}
// Output:
// 'a'
// 'b'
```

使用场景： 当我们需要自定义一个对象的迭代行为时，可以通过定义Symbol.iterator属性来实现。例如，对于自定义的数据结构，我们可以定义它的Symbol.iterator方法以便能够使用for...of语句进行遍历。

### Symbol.hasInstance

Symbol.hasInstance是一个预定义好的Symbol值，用于定义对象的 instanceof 操作符行为。当一个对象的原型链中存在Symbol.hasInstance方法时，该对象可以被instanceof运算符使用。

```javascript
class Foo {
  static [Symbol.hasInstance](obj) {
    return obj instanceof Array;
  }
}

console.log([] instanceof Foo); // true
console.log({} instanceof Foo); // false
```

使用场景： 当我们需要自定义一个对象的 instanceof 行为时，可以通过定义Symbol.hasInstance方法来实现。

### Symbol.isConcatSpreadable

Symbol.isConcatSpreadable是一个预定义好的Symbol值，用于定义对象在使用concat()方法时的展开行为。如果一个对象的Symbol.isConcatSpreadable属性为false，则在调用concat()方法时，该对象不会被展开。

```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const obj = { length: 2, 0: 5, 1: 6, [Symbol.isConcatSpreadable]: false };

console.log(arr1.concat(arr2)); // [1, 2, 3, 4]
console.log(arr1.concat(obj)); // [1, 2, { length: 2, 0: 5, 1: 6, [Symbol(Symbol.isConcatSpreadable)]: false }]
```

使用场景： 当我们需要自定义一个对象在使用concat()方法时的展开行为时，可以通过定义Symbol.isConcatSpreadable属性来实现。

### Symbol.toPrimitive

Symbol.toPrimitive是一个预定义好的Symbol值，用于定义对象在被强制类型转换时的行为。如果一个对象定义了Symbol.toPrimitive方法，则在将该对象转换为原始值时，会调用该方法。

```javascript
const obj = {
  valueOf() {
    return 1;
  },
  [Symbol.toPrimitive](hint) {
    if (hint === 'number') {
      return 2;
    } else if (hint === 'string') {
      return 'foo';
    } else {
      return 'default';
    }
  }
};

console.log(+obj); // 2
console.log(`${obj}`); // 'foo'
console.log(obj + ''); // 'default'

```

使用场景： 当我们需要自定义一个对象在被强制类型转换时的行为时，可以通过定义Symbol.toPrimitive方法来实现。

### Symbol.toStringTag

Symbol.toStringTag是一个预定义好的Symbol值，用于定义对象在调用Object.prototype.toString()方法时返回的字符串。如果一个对象定义了Symbol.toStringTag属性，则在调用该对象的toString()方法时，会返回该属性对应的字符串。

```javascript
class Foo {
  get [Symbol.toStringTag]() {
    return 'Bar';
  }
}

console.log(Object.prototype.toString.call(new Foo())); // '[object Bar]'
```

使用场景： 当我们需要自定义一个对象在调用Object.prototype.toString()方法时返回的字符串时，可以通过定义Symbol.toStringTag属性来实现。

### Symbol.species

Symbol.species是一个预定义好的Symbol值，用于定义派生对象的构造函数。如果一个对象定义了Symbol.species属性，则在调用该对象的派生方法（如Array.prototype.map()）时，返回的新对象会使用该属性指定的构造函数。

```javascript
class MyArray extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}

const myArr = new MyArray(1, 2, 3);
const arr = myArr.map(x => x * 2);

console.log(arr instanceof MyArray); // false
console.log(arr instanceof Array); // true
```

使用场景： 当我们需要自定义一个派生对象的构造函数时，可以通过定义Symbol.species属性来实现。

### Symbol.match

Symbol.match是一个预定义好的Symbol值，用于定义对象在调用String.prototype.match()方法时的行为。如果一个对象定义了Symbol.match方法，则在调用该对象的match()方法时，会调用该方法进行匹配。

```javascript
class Foo {
  [Symbol.match](str) {
    return str.indexOf('foo') !== -1;
  }
}

console.log('foobar'.match(new Foo())); // true
console.log('barbaz'.match(new Foo())); // false
```

使用场景： 当我们需要自定义一个对象在调用String.prototype.match()方法时的行为时，可以通过定义Symbol.match方法来实现。

### Symbol.replace

Symbol.replace是一个预定义好的Symbol值，用于定义对象在调用String.prototype.replace()方法时的行为。如果一个对象定义了Symbol.replace方法，则在调用该对象的replace()方法时，会调用该方法进行替换。

```javascript
class Foo {
  [Symbol.replace](str, replacement) {
    return str.replace('foo', replacement);
  }
}

console.log('foobar'.replace(new Foo(), 'baz')); // 'bazbar'
console.log('barbaz'.replace(new Foo(), 'baz')); // 'barbaz'
```

使用场景： 当我们需要自定义一个对象在调用String.prototype.replace()方法时的行为时，可以通过定义Symbol.replace方法来实现。

### Symbol.search

Symbol.search是一个预定义好的Symbol值，用于定义对象在调用String.prototype.search()方法时的行为。如果一个对象定义了Symbol.search。

```javascript
class Foo {
  [Symbol.search](str) {
    return str.indexOf('foo');
  }
}

console.log('foobar'.search(new Foo())); // 0
console.log('barbaz'.search(new Foo())); // -1

```

使用场景： 当我们需要自定义一个对象在调用String.prototype.search()方法时的行为时，可以通过定义Symbol.search方法来实现。

### Symbol.split

Symbol.split是一个预定义好的Symbol值，用于定义对象在调用String.prototype.split()方法时的行为。如果一个对象定义了Symbol.split方法，则在调用该对象的split()方法时，会调用该方法进行分割。

```javascript
class Foo {
  [Symbol.split](str) {
    return str.split(' ');
  }
}

console.log('foo bar baz'.split(new Foo())); // ['foo', 'bar', 'baz']
console.log('foobarbaz'.split(new Foo())); // ['foobarbaz']
```

使用场景： 当我们需要自定义一个对象在调用String.prototype.split()方法时的行为时，可以通过定义Symbol.split方法来实现。

### Symbol.iterator

Symbol.iterator是一个预定义好的Symbol值，用于定义对象在被遍历时的行为。如果一个对象定义了Symbol.iterator方法，则可以使用for...of循环、扩展运算符等方式来遍历该对象。

```javascript
class Foo {
  constructor() {
    this.items = ['foo', 'bar', 'baz'];
  }

  *[Symbol.iterator]() {
    for (const item of this.items) {
      yield item;
    }
  }
}

const foo = new Foo();

for (const item of foo) {
  console.log(item);
}

// 'foo'
// 'bar'
// 'baz'
```

使用场景： 当我们需要自定义一个对象在被遍历时的行为时，可以通过定义Symbol.iterator方法来实现。比如，我们可以通过实现Symbol.iterator方法来支持自定义数据结构的遍历。

### Symbol.unscopables

Symbol.unscopables是一个预定义好的Symbol值，用于定义对象在使用with语句时的行为。如果一个对象定义了Symbol.unscopables属性，则在使用with语句时，该对象的指定属性将不会被绑定到with语句的环境中。

```javascript
const obj = {
  a: 1,
  b: 2,
  c: 3,
  [Symbol.unscopables]: {
    c: true
  }
};

with (obj) {
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // ReferenceError: c is not defined
}
```

使用场景： 由于with语句会带来一些安全性问题和性能问题，因此在实际开发中不建议使用。但是，如果确实需要使用with语句，可以通过定义Symbol.unscopables属性来避免某些属性被误绑定到with语句的环境中。

## 总结

------

Symbol是ES6中新增的一种基本数据类型，用于表示独一无二的值。Symbol值在语言层面上解决了属性名冲突的问题，可以作为对象的属性名使用，并且不会被意外覆盖。除此之外，Symbol还具有以下特点：

- Symbol值是唯一的，每个Symbol值都是独一无二的，即使是通过相同的描述字符串创建的Symbol值，也不会相等；
- Symbol值可以作为对象的属性名使用，并且不会被意外覆盖；
- Symbol值可以作为私有属性来使用，因为无法通过对象外部访问对象中的Symbol属性；
- Symbol值可以被用作常量，因为它们是唯一的；
- Symbol值可以用于定义迭代器、类型转换规则、私有属性、元编程等高级功能。

在使用Symbol时需要注意以下几点：

- Symbol值不能使用new运算符创建；
- Symbol值可以通过描述字符串来创建，但是描述字符串并不是Symbol值的唯一标识符；
- Symbol属性在使用时需要用[]来访问，不能使用.运算符；
- 同一对象中的多个Symbol属性是独立的，它们之间不会互相影响。

总之，Symbol是一个非常有用的数据类型，在JavaScript中具有非常广泛的应用。使用Symbol可以有效地避免属性名冲突问题，并且可以为对象提供一些高级功能。熟练掌握Symbol，有助于我们写出更加健壮、高效和可维护的JavaScript代码。
