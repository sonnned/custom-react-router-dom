import { Children, useEffect, useState } from "react";
import { EVENTS } from "./consts";
import { match } from "path-to-regexp";
import { getCurrentPath } from "./utils";

export function Router({
  children,
  routes = [],
  defaultComponent: DefaultComponent = () => <h1>404</h1>,
}) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());

  useEffect(() => {
    //we save the function in a variable to have the same reference
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath());
    };

    // we listen the event when we go to another page
    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange);
    //we listen the event when we go back or forward
    window.addEventListener(EVENTS.POPSTATE, onLocationChange);

    //cleanup event listener
    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange);
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange);
    };
  }, []);

  let routeParams = {};

  //add routes from children components
  const routesFromChildren = Children.map(children, ({ props, type }) => {
    //the props is an object that contains
    //the path and the component to render
    const { name } = type;
    const isRoute = name === "Route";

    if (!isRoute) return null;

    return props;
  });

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean);

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true;

    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;

    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? (
    <Page routeParams={routeParams} />
  ) : (
    <DefaultComponent routeParams={routeParams} />
  );
}
