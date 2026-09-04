const positions = new Map<string, number>();

export function saveScrollPosition(path: string, y = window.scrollY) {
  positions.set(path, y);
}

export function getScrollPosition(path: string) {
  return positions.get(path);
}

export function scrollToY(y: number) {
  const html = document.documentElement;
  const previous = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto";
  window.scrollTo(0, y);
  html.style.scrollBehavior = previous;
}
