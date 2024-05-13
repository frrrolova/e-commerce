import { anonymousFlowCLient } from './buildClient';
import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

// Create apiRoot from the imported ClientBuilder and include your Project key
export const apiRoot = createApiBuilderFromCtpClient(anonymousFlowCLient).withProjectKey({
  projectKey: VITE_CTP_PROJECT_KEY,
});

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// const getProject = () => {
//   return apiRoot.get().execute();
// };

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);
