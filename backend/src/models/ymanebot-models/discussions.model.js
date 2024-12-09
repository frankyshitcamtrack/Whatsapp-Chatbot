const pool = require('../../config/db');

async function getDiscussions() {
  const result = await pool.query(
    'SELECT * FROM discussions INNER JOIN pushs_campagnes ON discussions.id_push_campaign=pushs_campagnes.id WHERE discussions.isDelete=0'
  );
  return result[0];
}

async function getDiscussionById(id) {
  const result = await pool.query(
    `SELECT * FROM discussions WHERE id_discussion=${id} AND isDelete=0`
  );
  return result[0];
}

function insertDiscussion(id_discussion, numero, status, id_push_campaign) {
  pool.query(
    `INSERT INTO discussions SET id_discussion= ?, numero= ?, status= ?, id_push_campaign= ?`,
    [id_discussion, numero, status, id_push_campaign]
  );
}

function updateStatusDiscussion(id_discussion, status) {
  const id = `"${id_discussion}"`;
  const state = `"${status}"`;
  pool.query(
    `UPDATE discussions SET status=${state} WHERE id_discussion=${id}`
  );
}

async function getDiscussionsByStatus(status) {
  const result = await pool.query(
    `SELECT * FROM discussions WHERE status=${status} AND isDelete=0`
  );
  return result[0];
}

module.exports = {
  getDiscussions,
  getDiscussionById,
  insertDiscussion,
  updateStatusDiscussion,
  getDiscussionsByStatus,
};
