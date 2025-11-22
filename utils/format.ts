export function formatCurrency(amount: number, currency: string = 'USD') {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency
  }).format(amount);
}

