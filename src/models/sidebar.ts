export type TMenuItem = {
  title: string;
  icon?: React.ReactNode;
  href?: string;
  badge?: number;
  tooltip?: string;
  child?: TMenuItem[];
}

export type TMenuSection = {
  label: string;
  items: TMenuItem[];
}