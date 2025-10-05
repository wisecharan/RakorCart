export const formatCurrency = (amount) => {
  if (typeof amount !== 'number') {
    amount = Number(amount);
  }
  return `$${amount.toFixed(2)}`;
};