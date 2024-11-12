import api_npmjs from './handlers/api.npmjs/handlers';
import deno_bundlejs from './handlers/deno.bundlejs/handlers';
import npmxt from './handlers/npmxt/handlers';
import registry_npmjs from './handlers/registry.npmjs/handlers';

export default [...npmxt, ...registry_npmjs, ...api_npmjs, ...deno_bundlejs];
