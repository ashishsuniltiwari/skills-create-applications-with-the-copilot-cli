#!/usr/bin/env node
"use strict";

/**
 * calculator.js
 * Node.js CLI calculator
 * Supported operations:
 * - addition
 * - subtraction
 * - multiplication
 * - division
 *
 * Usage examples:
 *   node src/calculator.js add 2 3
 *   node src/calculator.js sub 10 4  -> 6
 *   node src/calculator.js mul 2 3 4 -> 24
 *   node src/calculator.js div 8 2   -> 4
 */

function printHelp() {
  console.log(`Node.js CLI Calculator

Usage:
  calculator.js <operation> <num1> <num2> [num3 ...]

Operations:
  add    : addition (sum of all operands)
  sub    : subtraction (left-associative: num1 - num2 - num3 ...)
  mul    : multiplication (product of all operands)
  div    : division (left-associative: num1 / num2 / num3 ...)

Options:
  -h, --help   Show this help message

Examples:
  node src/calculator.js add 2 3
  node src/calculator.js sub 10 3  -> 7
  node src/calculator.js mul 2 3 4 -> 24
  node src/calculator.js div 8 2   -> 4
`);
}

function exitWithError(message, code = 1) {
  console.error(`Error: ${message}`);
  process.exit(code);
}

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '-h' || args[0] === '--help') {
  printHelp();
  process.exit(0);
}

const op = args[0].toLowerCase();
const rawNums = args.slice(1);
if (rawNums.length < 2) {
  exitWithError('At least two numeric operands are required.');
}

const nums = rawNums.map((s) => {
  const n = Number(s);
  if (Number.isNaN(n)) {
    exitWithError(`Invalid number: '${s}'`);
  }
  return n;
});

let result;
switch (op) {
  case 'add':
  case 'sum':
    // addition: sum of all operands
    result = nums.reduce((a, b) => a + b, 0);
    break;

  case 'sub':
  case 'subtract':
    // subtraction: left-associative
    result = nums.slice(1).reduce((a, b) => a - b, nums[0]);
    break;

  case 'mul':
  case 'multiply':
    // multiplication: product of all operands
    result = nums.reduce((a, b) => a * b, 1);
    break;

  case 'div':
  case 'divide':
    // division: left-associative, handle division by zero
    result = nums.slice(1).reduce((a, b) => {
      if (b === 0) {
        exitWithError('Division by zero', 2);
      }
      return a / b;
    }, nums[0]);
    break;

  default:
    exitWithError(`Unknown operation '${op}'. See --help.`);
}

// Print result to stdout
if (Number.isFinite(result)) {
  // If result is an integer, print without trailing decimals
  if (Number.isInteger(result)) {
    console.log(result);
  } else {
    console.log(result);
  }
  process.exit(0);
} else {
  exitWithError('Computation resulted in a non-finite number.');
}
