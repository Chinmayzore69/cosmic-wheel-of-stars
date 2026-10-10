/** Digit-sum method: sum all birth-date digits, reduce, preserving 11, 22, 33. */
export function reduceNumber(value: number): number {
  while (value > 9 && ![11, 22, 33].includes(value)) {
    value = String(value).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return value;
}

export function calculateNumbers(date: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Enter a valid date of birth.");
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date || date > new Date().toISOString().slice(0, 10)) {
    throw new Error("Enter a real date of birth that is not in the future.");
  }
  return {
    lifePath: reduceNumber(date.replaceAll("-", "").split("").reduce((sum, digit) => sum + Number(digit), 0)),
    birthNumber: reduceNumber(Number(date.slice(-2))),
  };
}