import {
  bind,
  natural,
  orElse,
  parse,
  Parser,
  pure,
  symbol,
} from "./parser.js";

export const factor: Parser<number> = orElse(
  bind(symbol("("), () => bind(expr, (e) => bind(symbol(")"), () => pure(e)))),
  natural
);

export const term: Parser<number> = bind(factor, (f) =>
  orElse(
    bind(symbol("*"), () => bind(term, (t) => pure(f * t))),
    pure(f)
  )
);

export const expr: Parser<number> = bind(term, (t) =>
  orElse(
    bind(symbol("+"), () => bind(expr, (e) => pure(t + e))),
    orElse(
      bind(symbol("-"), () => bind(expr, (e) => pure(t - e))),
      pure(t)
    )
  )
);

export const evaluate = (xs: string) => {
  const result = parse(expr)(xs);
  if (result.length === 0) return "Invalid input";
  const [[left, right]] = result;
  if (right === "") return left;
  return `Unused input: ${right}`;
};
