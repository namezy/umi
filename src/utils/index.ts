export const selectLayout = (pathname: string) => {
  return pathname.includes('users') ? 'LoginLayout' : 'BaseLayout';
};
