const PARAM_PATTERN = /:\w+/;

export const transformRoute = (route: string, ...values: string[]): string => {
  let transformedRoute = route;

  values.forEach((value) => {
    transformedRoute = transformedRoute.replace(PARAM_PATTERN, value);
  });

  return transformedRoute;
};
