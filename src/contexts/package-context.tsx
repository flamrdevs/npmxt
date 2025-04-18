import { createContext, useContext } from 'solid-js';

import type { TPackageSchema } from '~/npm/schema';

export const PackageContext = createContext<TPackageSchema>({} as TPackageSchema);
export const usePackageContext = () => useContext(PackageContext);
