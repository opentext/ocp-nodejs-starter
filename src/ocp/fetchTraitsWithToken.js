import fetchAccessToken from './fetchAccessToken.js';
import listTraitDefinitions from './listTraitDefinitions.js';

const env = process.env;

/**
 * @public
 * @async
 *
 * @summary Gets a token and fetches the Content Metadata services traits
 * @description Fetches the access token and then fetches all traits from the
 *     Content Metadata service. Extracts the trait collection from the response.
 *
 * @return {Promise<Object[]>} - A promise for the trait collection.
 */
const fetchTraitsWithToken = async () => {
  // Set the base API URL for the Content Metadata service
  const cmsUrl = new URL('cms', env.BASE_SERVICE_URL);

  // Fetch an access token using the client_credentials oauth grant
  const accessToken = await fetchAccessToken(
    env.BASE_SERVICE_URL,
    env.TENANT_ID,
    env.CONF_CLIENT_ID,
    env.CLIENT_SECRET
  );

  // Build some query params to pass in to modify the response
  const queryParams = new URLSearchParams();
  // The page number required
  queryParams.append('page', '1');
  // Number of items per page
  queryParams.append('items-per-page', '10');
  // Sort by display name
  queryParams.append('sortby', 'display_name');

  // Fetch the traits currently defined in the Content Metadata service
  // All systems start with some default traits
  const resp = await listTraitDefinitions(
    cmsUrl.href,
    accessToken,
    queryParams
  );

  // Get a list of the display names for all traits in the system
  return resp.data._embedded.collection;
};

export { fetchTraitsWithToken };
