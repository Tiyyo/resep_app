export function displayMultiString(content: Array<string>) {
  if (content) return content.map((el: string) => el).join(" ");
}