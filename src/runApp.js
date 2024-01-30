import { fetchTraitsWithToken } from './ocp/fetchTraitsWithToken.js';
import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: '.env.secret' });

const runApp = async () => {
  try {
    const traits = await fetchTraitsWithToken();
    console.log(
      'Traits currently in the system are:',
      traits.map(trait => trait.display_name).join(', ')
    );
  } catch (err) {
    const errorJSON = err.toJSON();
    console.error(
      `Status: ${errorJSON.status} - Message: ${errorJSON.message} - Url: ${errorJSON.config?.url}`
    );
  }
};

export default runApp;
