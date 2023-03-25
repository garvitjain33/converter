function getFxUpdateNumber(fx: number) {
  const maxVal = 0.05;
  const minVal = -0.05;
  const randomNumber = Math.random();

  const updateBy = randomNumber * (maxVal - minVal) + minVal;

  return fx + updateBy;
}

export default getFxUpdateNumber;
