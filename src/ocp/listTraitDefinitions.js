import axios from 'axios';

/**
 * @public
 * @async
 *
 * @summary Get list of all trait definitions available
 * @description Returns list of all trait definitions
 *
 * @param {string} apiBaseUrl - Content Metadata Service base URL.
 * @param {string} accessToken - A valid access token for OCP services.
 * @param {URLSearchParams} params - The request params to be appended to the URL.
 * @return {Promise<AxiosResponse>} - A promise for the API response.
 */
const listTraitDefinitions = async (apiBaseUrl, accessToken, params) => {
  return axios({
    method: 'get',
    url: `${apiBaseUrl}/trait-definitions`,
    params,
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export default listTraitDefinitions;
