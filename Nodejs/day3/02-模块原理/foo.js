// 在 Node 中，每个模块内部都有一个自己的 module 对象
// 该 module 对象中，有一个成员叫：exports 也是一个对象
// 也就是说如果你需要对外导出成员，只需要把导出的成员挂载到 module.exports 中

// var module = {
//   exports: {
//     foo: 'bar',
//     add: function
//   }
// }

// module.exports.foo = 'bar'

// module.exports.add = function (x, y) {
//   return x + y
// }

// 我们发现，每次导出接口成员的时候都通过 module.exports.xxx = xxx 的方式很麻烦，点儿的太多了
// 所以，Node 为了简化你的操作，专门提供了一个变量：exports 等于 module.exports
// 也就是说在模块中还有这么一句代码
// var exports = module.exports

// 两者一致，那就说明，我可以使用任意一方来导出内部成员
// console.log(exports === module.exports)

// exports.foo = 'bar'
// exports.add = function (x, y) {
//   return x + y
// }

// 当一个模块需要导出单个成员的时候
// 直接给 exports 赋值是不管用的
// 给 exports 赋值会断开和 module.exports 之间的引用
// 最终 return 的是 module.exports

// module.exports.a = 123
// exports = {}    // 这里导致 module.exports !== exports
// module.exports.b = 456
// 结果 {a: 123, b: '456'}

// 给 exports 赋值会断开和 module.exports 之间的引用
// 同理，给 module.exports 重新赋值也会断开
// 1.
// module.exports = 'hello'  // 这里导致 exports !== module.exports
// exports.foo = 'world'
// 结果 hello

// 2.
// module.exports = {   // 这里导致 exports !== module.exports
//   foo: 'bar'
// }
// 但是这里又重新建立两者的引用关系
// exports = module.exports
// exports.foo = 'hello'
// 结果 { foo: 'hello' }


// 测试一下：
exports.foo = 'bar' // {foo: bar}

module.exports.a = 123 // {foo: bar, a: 123}
exports = {  // exports !== module.exports
  a: 456
}

module.exports.foo = 'haha' // {foo: 'haha', a: 123}

exports.c = 456 // 最终 return 的是 module.exports 所以无论你 exports 中的成员是什么都没用

exports = module.exports // 重新建立了和 module.exports 之间的引用关系了

exports.a = 789 // 由于在上面建立了引用关系，所以这里是生效的 {foo: 'haha', a: 789}

module.exports = function () { // 前面再牛逼，在这里都全部推翻了，重新赋值，最终得到的是 Function
  console.log('hello')
}

// 真正去使用的时候：
//    导出多个成员：exports.xxx = xxx
//    导出多个成员也可以：module.exports = {}
//    导出单个成员：module.exports


// 谁来 require 我，谁就得到 module.exports
// 默认在代码的最后有一句：
// 一定要记住，最后 return 的是 module.exports
// 不是 exports
// 所以你给 exports 重新赋值不管用，
// return module.exports
