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
  window.scrollTo({ top: y, left: 0, behavior: "auto" });
  html.scrollTop = y;
  document.body.scrollTop = y;
  html.style.scrollBehavior = previous;
}
