import axios from 'axios';

/**
 * @public
 * @async
 *
 * @summary Authenticate and fetch an access token using the oAuth client credentials grant
 * @description This operation will use a confidential client with an id and secret set up to
 *     communicate with your application to generate an access token. This is typically used
 *     for backend clients without a standard interactive user login
 *
 * @param {string} baseServiceUrl - The base URL for the OCP environment.
 * @param {string} tenantId - The ID for the tenant your application is deployed into.
 * @param {string} confClientId - The ID for the confidential client used to access your application.
 * @param {string} clientSecret - The secret for the confidential client used to access your application.
 * @return {Promise<AxiosResponse>} - A promise for the access token.
 */
const fetchAccessToken = async (
  baseServiceUrl,
  tenantId,
  confClientId,
  clientSecret
) => {
  const wellKnowConfig = await axios.get(
    `${baseServiceUrl}/tenants/${tenantId}/.well-known/openid-configuration`
  );
  const authResp = await axios({
    method: 'post',
    url: wellKnowConfig.data.token_endpoint,
    headers: {
      'Content-Type': 'application/json'
    },
    data: {
      client_id: confClientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials'
    }
  });
  return authResp.data.access_token;
};

export default fetchAccessToken;
