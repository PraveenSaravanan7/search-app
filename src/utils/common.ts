export const debounce = <F extends (...args: unknown[]) => unknown>(
  func: F,
  delay: number
): ((...args: Parameters<F>) => void) => {
  let timeoutId: number | null = null;

  return (...args: Parameters<F>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => func(...args), delay);
  };
};

export const highlightText = (text: string, query: string) => {
  if (!query) return text;

  const regex = new RegExp(query, "gi");

  return text.replace(regex, `<b>$&</b>`);
};
