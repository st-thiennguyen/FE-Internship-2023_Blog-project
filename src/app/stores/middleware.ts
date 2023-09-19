export const loggerMiddleware = (storeAPI: any) => (next: any) => (action: any) => {
  console.log('Dispatching:', action);
  console.log('Current state: ', storeAPI.getState());
  next(action);
  console.log('Next State: ', storeAPI.getState());
};
