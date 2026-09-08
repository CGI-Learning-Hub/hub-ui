export type ButtonGroup =
  "history" | "blocks" | "marks" | "scripts" | "textAlign";

export type ButtonDef = {
  Component: React.FC;
  extensionName: string;
  group: ButtonGroup;
  id: string;
};
