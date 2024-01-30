import dotenv from 'dotenv';
import fetchAccessToken from './ocp/fetchAccessToken.js';
import listTraitDefinitions from './ocp/listTraitDefinitions.js';

dotenv.config();
dotenv.config({ path: '.env.secret' });

const env = process.env;

const callOcp = async () => {
  try {
    const cmsUrl = new URL('cms', env.BASE_SERVICE_URL);

    // Fetch an access token using the client_credentials oauth grant
    const accessToken = await fetchAccessToken(
      env.BASE_SERVICE_URL,
      env.TENANT_ID,
      env.CONF_CLIENT_ID,
      env.CLIENT_SECRET
    );

    // Build some query params to pass into listTraitDefinitions to modify the response
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
    console.log(
      'Traits currently in the system are:',
      resp.data._embedded.collection.map(trait => trait.display_name).join(', ')
    );
  } catch (err) {
    const errorJSON = err.toJSON();
    console.error(
      `Status: ${errorJSON.status} - Message: ${errorJSON.message} - Url: ${errorJSON.config?.url}`
    );
  }
};

export default callOcp;
