export const isPrime = (n: number): boolean => {
  if (n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;

  const sqrt = Math.sqrt(n);
  for (let i = 3; i <= sqrt; i += 2) {
    if (n % i === 0) return false;
  }
  return true;
};

export const isPerfect = (n: number): boolean => {
  if (n <= 1) return false;
  let sum = 1;
  const sqrt = Math.sqrt(n);
  for (let i = 2; i <= sqrt; i++) {
    if (n % i === 0) {
      sum += i;
      const complement = n / i;
      if (complement !== i) sum += complement;
    }
  }
  return sum === n;
};

export const isArmstrong = (n: number): boolean => {
  const absolute = Math.abs(n);
  const digits = absolute.toString().split('');
  const power = digits.length;
  const sum = digits.reduce(
    (acc, digit) => acc + Math.pow(parseInt(digit, 10), power),
    0,
  );
  return sum === absolute;
};

export const digitSum = (n: number): number => {
  const absolute = Math.abs(n);
  return absolute
    .toString()
    .split('')
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
};
