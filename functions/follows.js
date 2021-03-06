import fetch from 'node-fetch';
require('dotenv').config();

const {
  TWITCH_CLIENT_ID
} = process.env;

const getApiUrl = (from_id, after) => {
  var url = `https://api.twitch.tv/helix/users/follows?`;

  if(from_id){
    url += `from_id=${from_id}`;
  };

  if(after){
    url += `&after=${after}`;
  }

  return url;
};

exports.handler = async (event) => {
  // We can retrive type of http method in event parameter
  const { httpMethod } = event;

  if (httpMethod === 'GET') {
    const from_id = event.queryStringParameters.from_id;
    const after = event.queryStringParameters.after;
    const apiUrl = getApiUrl(from_id, after);

    const response = await fetch(
      apiUrl,
      {
        headers: {
          'content-type': 'application/json',
          'Client-ID': TWITCH_CLIENT_ID
        }
      }
    )
    const userData = await response.text();
    return {
      statusCode: 200,
      body: userData,
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Access-Control-Allow-Headers": "Content-Type",
        'content-type': 'application/json'
      }
    };
  }

  return { statusCode: 404 };
}
