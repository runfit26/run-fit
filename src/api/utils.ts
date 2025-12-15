const serverUrl = process.env.NEXT_PUBLIC_API_URL;
export const proxyUrl = (pathname: string) =>
  new URL(`/api${pathname}`, serverUrl);
