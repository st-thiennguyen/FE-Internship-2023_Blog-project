export interface RouteItem {
  name?: string;
  path: string;
  component: (props: any) => JSX.Element;
  isProtected?: Boolean;
  children?: RouteItem[];
  props?: Object;
}
