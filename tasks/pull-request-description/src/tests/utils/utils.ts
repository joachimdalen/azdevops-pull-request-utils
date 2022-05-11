import { EOL } from 'os';

export function joinTestString(values: string[]): string {
  return values.join(EOL + EOL) + EOL;
}
