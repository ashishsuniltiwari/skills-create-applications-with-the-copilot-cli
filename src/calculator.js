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
 * This file is both a CLI entrypoint and a library for tests.
 */

function add(nums) {
  return nums.reduce((a, b) => a + b, 0);
}

function sub(nums) {
  if (nums.length === 0) return 0;
  return nums.slice(1).reduce((a, b) => a - b, nums[0]);
}

function mul(nums) {
  return nums.reduce((a, b) => a * b, 1);
}

function div(nums) {
  if (nums.length === 0) return NaN;
  return nums.slice(1).reduce((a, b) => {
    if (b === 0) {
      throw new Error('Division by zero');
    }
    return a / b;
  }, nums[0]);
}

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
`);
}

function exitWithError(message, code = 1) {
  console.error(`Error: ${message}`);
  process.exit(code);
}

function runCLI(argv) {
  const args = argv.slice(2);
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
  try {
    switch (op) {
      case 'add':
      case 'sum':
        result = add(nums);
        break;

      case 'sub':
      case 'subtract':
        result = sub(nums);
        break;

      case 'mul':
      case 'multiply':
        result = mul(nums);
        break;

      case 'div':
      case 'divide':
        result = div(nums);
        break;

      default:
        exitWithError(`Unknown operation '${op}'. See --help.`);
    }
  } catch (err) {
    exitWithError(err.message, 2);
  }

  if (Number.isFinite(result)) {
    console.log(result);
    process.exit(0);
  } else {
    exitWithError('Computation resulted in a non-finite number.');
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { add, sub, mul, div, runCLI };
}

if (require.main === module) {
  runCLI(process.argv);
}
