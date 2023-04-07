export function minifyName(name: string): string {
  const names = name.split(' ')

  if (names.length > 1) {
    return `${names[0]} ${names.at(-1)}`
  }

  return name
}
