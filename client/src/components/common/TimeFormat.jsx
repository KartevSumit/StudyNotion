export function formatDateISO(isoString) {
  const dt = new Date(isoString);

  const opts = {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };
  const localeString = dt.toLocaleString('en-US', opts);
  const parts = localeString.split(' at ');
  return `${parts[0]} | ${parts[1].trim()}`;
}
