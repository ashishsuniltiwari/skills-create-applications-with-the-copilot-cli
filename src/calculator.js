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

function modulo(nums) {
  if (nums.length < 2) throw new Error('Modulo requires two operands');
  const a = nums[0];
  const b = nums[1];
  if (b === 0) throw new Error('Division by zero');
  return a % b;
}

function power(nums) {
  if (nums.length < 2) throw new Error('Power requires two operands');
  const base = nums[0];
  const exponent = nums[1];
  return Math.pow(base, exponent);
}

function squareRoot(nums) {
  if (nums.length < 1) throw new Error('Square root requires one operand');
  const n = nums[0];
  if (n < 0) throw new Error('Square root of negative number');
  return Math.sqrt(n);
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
  mod    : modulo (a % b)
  pow    : power (base ** exponent)
  sqrt   : square root (sqrt(n))

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

  // Accept one operand for sqrt, two for mod/pow/div, and two+ for others
  const minRequired = (op === 'sqrt' || op === 'sq' || op === 's') ? 1 : 2;
  if (rawNums.length < minRequired) {
    exitWithError(`At least ${minRequired} numeric operand(s) are required for '${op}'.`);
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

      case 'mod':
      case 'remainder':
        result = modulo(nums);
        break;

      case 'pow':
      case 'power':
        result = power(nums);
        break;

      case 'sqrt':
      case 'sqrtn':
      case 'square-root':
        result = squareRoot(nums);
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
  module.exports = { add, sub, mul, div, modulo, power, squareRoot, runCLI };
}

if (require.main === module) {
  runCLI(process.argv);
}
