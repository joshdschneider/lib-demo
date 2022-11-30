export function prepend(className: string, classList?: string) {
  return !classList ? className : className + " " + classList;
}
