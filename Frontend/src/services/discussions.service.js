import axios from 'axios';

import baseUrl from '../config';

async function getDiscussions() {
  try {
    const res = await axios.get(`${baseUrl}/discussions`);
    const data = await res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getDiscussionbyId(id) {
  const res = await axios(`${baseUrl}/single-discussion/${id}`);
  const data = await res.json();
  return data;
}

async function getDiscussionbyTypeCampaignNameAndStatusDiscussions(
  typeCampagneName,
  status
) {
  const res = await axios(`${baseUrl}/single-discussion`, {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'get',
    body: {
      typeCampaignName: JSON.stringify(typeCampagneName),
      status: JSON.stringify(status),
    },
  });
  const data = await res.json();
  return data;
}

export {
  getDiscussions,
  getDiscussionbyId,
  getDiscussionbyTypeCampaignNameAndStatusDiscussions,
};
