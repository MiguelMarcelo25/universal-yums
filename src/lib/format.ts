export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
