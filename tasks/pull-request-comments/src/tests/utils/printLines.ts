export function printLines(content: string): void {
  const lines = content.split('/n');

  for (let i = 0; i < lines.length; i++) {
    console.log(lines[i]);
  }
}
