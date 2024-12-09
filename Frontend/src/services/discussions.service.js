import axios from 'axios';

import baseUrl from '../config';

async function getDiscussions() {
  try {
    const res = await axios.get(`${baseUrl}/discussions`);
    const data = await res.data;
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

async function getDiscussionbyTypeCampaignNameAndStatusDiscussions() {
  const res = await axios(`${baseUrl}/dashboard`);
  const data = await res.data;
  return data;
}

export {
  getDiscussions,
  getDiscussionbyId,
  getDiscussionbyTypeCampaignNameAndStatusDiscussions,
};
