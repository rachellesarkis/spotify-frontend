export const formatNumber = (number) => {
  if (typeof number !== "number") {
    throw new Error("Input must be a number");
  }

  if (number >= 1_000_000) {
    return `${(number / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  } else if (number >= 1_000) {
    return `${(number / 1_000).toFixed(1).replace(/\.0$/, "")}k`;
  } else {
    return number.toString();
  }
};
