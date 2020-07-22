import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";
import { calculate } from "./calculator.ts";

Deno.test("Basic addition", () => {
  const input = "1+1";
  const expected = 2;
  assertEquals(calculate(input), expected);
});

Deno.test("Order of operations", () => {
  const input = "1+1*2";
  const expected = 3;
  assertEquals(calculate(input), expected);
});

Deno.test("Parentheses", () => {
  const input = "(1+1)*2";
  const expected = 4;
  assertEquals(calculate(input), expected);
});

Deno.test("Nested parentheses", () => {
  const input = "1+(3*(1+2))-8";
  const expected = 2;
  assertEquals(calculate(input), expected);
});

Deno.test("Multi-digit numbers", () => {
  const input = "149+57-106";
  const expected = 100;
  assertEquals(calculate(input), expected);
});
