export const SubEventName = {
  hello: 'hello',
} as const;
export type SubEventNameType = keyof typeof SubEventName & string;
