export const button = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md font-medium",
  secondary:
    "bg-secondary text-primary-foreground hover:bg-secondary/90 px-4 py-2 rounded-md font-medium",
  danger:
    "bg-destructive text-white hover:bg-destructive/90 px-4 py-2 rounded-md font-medium",
  accent:
    "bg-accent text-accent-foreground hover:bg-accent/90 px-4 py-2 rounded-md font-medium",
  outline:
    "border border-border text-foreground hover:bg-muted px-4 py-2 rounded-md font-medium",
  ghost:
    "bg-transparent text-foreground hover:bg-muted px-4 py-2 rounded-md font-medium",
  disabled:
    "bg-muted text-muted-foreground opacity-60 cursor-not-allowed px-4 py-2 rounded-md",
};

export const text = {
  heading: "text-2xl font-bold text-foreground",
  subheading: "text-xl font-semibold text-muted-foreground",
  label: "text-sm font-medium text-muted-foreground",
  link: "text-primary hover:underline",
  danger: "text-destructive font-semibold",
};

export const card = {
  base: "bg-card text-card-foreground p-4 rounded-lg shadow",
  withBorder:
    "bg-card text-card-foreground p-4 rounded-lg border border-border",
  hoverable: "transition-shadow hover:shadow-md",
};

export const input = {
  base: "bg-input text-foreground border border-border rounded-md px-3 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary",
  invalid:
    "border-destructive text-destructive placeholder:text-destructive/70",
};

export const textarea = input.base + " resize-none h-24";
export const select = input.base;
export const checkbox = "accent-primary";

export const badge = {
  base: "text-xs font-semibold uppercase px-2 py-1 rounded-full",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  danger: "bg-destructive text-white",
  muted: "bg-muted text-muted-foreground",
};

export const alert = {
  base: "rounded-md p-4 border",
  info: "bg-blue-50 border-blue-200 text-blue-900",
  success: "bg-green-50 border-green-200 text-green-900",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-900",
  danger: "bg-red-50 border-red-200 text-red-900",
};

export const modal = {
  overlay: "fixed inset-0 bg-black/50 backdrop-blur-sm z-40",
  content:
    "bg-background rounded-lg p-6 w-full max-w-md z-50 mx-auto mt-24 shadow-lg",
  title: "text-lg font-semibold text-foreground mb-2",
};

export const layout = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-8 sm:py-12",
  wrapper: "rounded-lg bg-muted p-4",
};

export const divider = "h-px bg-border my-4";
export const shadow = {
  sm: "shadow-sm",
  md: "shadow",
  lg: "shadow-lg",
};

