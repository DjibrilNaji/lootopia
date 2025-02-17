import { expect, test } from "@jest/globals"

test("adds 1 + 2 to equal 3", () => {
  const sum = (a: number, b: number) => {
    return a + b
  }

  expect(sum(1, 2)).toBe(3)
})
