import axios from 'axios';
import prepareRequest from './prepareRequest.js';
import prepareResponse from './prepareResponse.js';

const instance = axios.create({
  headers: { 
    'Content-Type': 'application/json',
    'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
  },
});

export default async function(params) {
  const reqParams = prepareRequest(params);
  try {
    const data = await instance(reqParams);
    return prepareResponse(data);
  }
  catch (err) {
    throw err;
  }
};