export type NavItem = {
  label: string;
  href: string;
};

export type AnalyticsEvent = {
  name: string;
  properties?: Record<string, string | number | boolean>;
};
