export interface RouteItem {
  name?: string;
  path: string;
  component: (props: any) => JSX.Element;
  isAuth?: Boolean;
  children?: RouteItem[];
  props?: Object;
}
