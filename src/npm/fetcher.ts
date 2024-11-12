import { ofetch } from 'ofetch';

import { BASE_URL_API, BASE_URL_REGISTRY } from './url';

export const fetcherPackage = (name: string, version: string) => ofetch(`${BASE_URL_REGISTRY}/${name}/${version}`);
export const fetcherPackageMetadata = (name: string) => ofetch(`${BASE_URL_REGISTRY}/${name}`);
export const fetcherPackageDownloadsPoint = (period: string, name: string) => ofetch(`${BASE_URL_API}/downloads/point/${period}/${name}`);
export const fetcherPackageDownloadsRange = (period: string, name: string) => ofetch(`${BASE_URL_API}/downloads/range/${period}/${name}`);
