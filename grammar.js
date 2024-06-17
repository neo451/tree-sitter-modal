lua = require('./lua.js')

const PREC = {
  COMMA: -1,
  FUNCTION: 1,
  DEFAULT: 1,
  PRIORITY: 2,

  OR: 3, // => or
  AND: 4, // => and
  COMPARE: 5, // => < <= == ~= >= >
  BIT_OR: 6, // => |
  BIT_NOT: 7, // => ~
  BIT_AND: 8, // => &
  SHIFT: 9, // => << >>
  CONCAT: 10, // => ..
  PLUS: 11, // => + -
  MULTI: 12, // => * /             // %
  UNARY: 13, // => not # - ~
  POWER: 14, // => ^

  STATEMENT: 15,
  PROGRAM: 16,
};

EQUALS_LEVELS = 5;

module.exports = grammar({
  name: 'modal',
  externals: ($) => [
    $._block_comment_start,
    $._block_comment_content,
    $._block_comment_end,

    $._string_start,
    $._string_content,
    $._string_end,
  ],
  extras: ($) => [/[\n]/, /\s/, $.comment],

  inline: ($) => [
    $._expression,
    $._field_expression,
    $.field_separator,
    $.prefix_exp,

    $.function_impl,
    $.comment,
  ],

  conflicts: ($) => [
    [$.variable_declarator, $._prefix_exp],
    [$.emmy_ignore, $.emmy_comment],
  ],
  rules: {
    ...lua
  }
})

