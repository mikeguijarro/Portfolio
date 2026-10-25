import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

// text-meta / text-ui / text-body are font sizes (tailwind.config.ts). Without this, tailwind-merge
// reads them as colours and drops one of "text-ui text-muted".
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["meta", "ui", "body"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
