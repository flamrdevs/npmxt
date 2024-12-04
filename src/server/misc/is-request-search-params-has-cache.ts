export const isRequestSearchParamsHasCache = (event: SolidJS.Start.Server.APIEvent) => new URL(event.request.url).searchParams.has('cache');
