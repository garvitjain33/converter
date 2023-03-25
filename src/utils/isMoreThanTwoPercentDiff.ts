function isMoreThanTwoPercentDiff(fx: number, override: number) {
  const difference = Math.abs(fx - override);

  const twoPercentOfFx = (fx * 2) / 100;

  return difference > twoPercentOfFx;
}

export default isMoreThanTwoPercentDiff;
