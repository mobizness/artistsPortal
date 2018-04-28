export const formatCurrency = (value, valueCurrencyCode = 'USD', locale = 'en') => {
  if (!valueCurrencyCode) {
    throw new Error('currency is missing');
  }

  if (value === null) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: valueCurrencyCode }).format(parseFloat(0)).replace(/[0-9\.\-+,]/g,'');
  }

  return new Intl.NumberFormat(locale, { style: 'currency', currency: valueCurrencyCode }).format(parseFloat(value));
};

export const formatNumber = (value, locale = 'en') =>
  new Intl.NumberFormat(locale, {
    style: 'decimal',
    maximumFractionDigits: 2
  }).format(value);

export const formatPercent = (value) => {
  if (value || typeof value === 'number') {
    return `${formatNumber(parseFloat(value || 0) * 100)}%`;
  }
  return '';
};

export const checkString = (filter, ...check) => {
  if (!check || !check.length || !filter || !filter.length) {
    return true;
  }
  let ret = false;
  check.forEach(c => {
    ret |= c.toLowerCase().includes(filter.toLowerCase());
  });
  return ret;
};