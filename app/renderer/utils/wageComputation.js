export function wageFunction(amount, wagePerThousands) {
  const computed = computeWage(amount, wagePerThousands);
  return {
    computed,
    displayed: computedWageToDisplayed(computed),
  };
}

export function computeWage(amount, wagePerThousands) {
  return Math.floor((amount * wagePerThousands) / 10);
}

export function computedWageToDisplayed(computedWage) {
  return (computedWage / 100).toFixed(2);
}