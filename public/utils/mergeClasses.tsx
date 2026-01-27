import { twMerge } from 'tailwind-merge';
import { clsx } from 'clsx';

export type ClassValue =
  | string
  | number
  | null
  | boolean
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | undefined | null };

export function mergeClasses(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export default mergeClasses;