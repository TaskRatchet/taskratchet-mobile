export default function convertCents(cents: number): string {
  if (cents % 100 === 0) {
    return '$' + cents / 100;
  } else {
    return '$' + Number(cents / 100).toFixed(2);
  }
}
