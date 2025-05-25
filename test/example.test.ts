import { parse } from "../src";
import { evaluate, factor, term } from "../src/example";

test("term", () => {
  expect(parse(term)("2 + 3 + 4")).toEqual([[2, " + 3 + 4"]]);
  expect(parse(term)("2 + 3 * 4")).toEqual([[2, " + 3 * 4"]]);
  expect(parse(term)("2 * 3 + 4")).toEqual([[6, " + 4"]]);
  expect(parse(term)("(2 + 3) + 4")).toEqual([[5, " + 4"]]);
  expect(parse(term)("2 * (3 + 4)")).toEqual([[14, ""]]);
  expect(parse(term)("(2+(4+3)) * 4")).toEqual([[36, ""]]);
});

test("factor", () => {
  expect(parse(factor)("2 * 3 + 4")).toEqual([[2, " * 3 + 4"]]);
  expect(parse(factor)("2 * (3 + 4)")).toEqual([[2, " * (3 + 4)"]]);
  expect(parse(factor)("(2+(4+3)) * 4")).toEqual([[9, " * 4"]]);
});

test("evaluate", () => {
  expect(evaluate("2 * 3 + 4")).toEqual(10);
  expect(evaluate("2*3-10")).toEqual(-4);
  expect(evaluate("2*(3+4)")).toEqual(14);
  expect(evaluate("2*3^4")).toEqual("Unused input: ^4");
  expect(evaluate("one plus two")).toEqual("Invalid input");
});
