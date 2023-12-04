export default function checkDate(date: string): number {
  const today = new Date();
  const deadline = new Date(date);
  const diff = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  return diffDays;
}
