import { EOL } from 'os';

export function joinString(values: string[]): string {
  return values.filter(x => x !== '').join(EOL) + EOL;
}
