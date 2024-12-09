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
    `SELECT * FROM discussions WHERE status=${param} AND isDelete=0`
  );
  return result[0];
}

async function getDiscussionByTypeCampaignNameAndStatus(
  typeCampagneName,
  status
) {
  const result = await pool.query(
    `SELECT d.status, p.push_campagne_name,t.name FROM discussions as d,pushs_campagnes as p,types_campagnes AS t WHERE (t.name=${typeCampagneName} AND d.status=${status} AND d.isDelete=0 AND t.isDelete=0)`
  );
  return result[0];
}

async function countSentMessageBytypeCampagne(typeCampagneName) {
  const TC = `"${typeCampagneName}"`;
  const result = await pool.query(
    `SELECT d.status, p.push_campagne_name,t.name FROM discussions as d,pushs_campagnes as p,types_campagnes AS t WHERE (t.name=${TC} AND d.isDelete=0 AND t.isDelete=0 AND (d.status='sent' OR d.status='read' OR d.status='delivered'))`
  );
  return result[0];
}

async function countFailedMessageBytypeCampagne(typeCampagneName) {
  const TC = `"${typeCampagneName}"`;
  const result = await pool.query(
    `SELECT d.status, p.push_campagne_name,t.name FROM discussions as d,pushs_campagnes as p,types_campagnes AS t WHERE (t.name=${TC} AND d.isDelete=0 AND t.isDelete=0 AND d.status='failed')`
  );
  return result[0];
}

async function countPendingMessageBytypeCampagne(typeCampagneName) {
  const TC = `"${typeCampagneName}"`;
  const result = await pool.query(
    `SELECT d.status, p.push_campagne_name,t.name FROM discussions as d,pushs_campagnes as p,types_campagnes AS t WHERE ( t.name=${TC} AND d.isDelete=0 AND t.isDelete=0 AND d.status='pending')`
  );
  return result[0];
}

async function countDeletedMessageBytypeCampagne(typeCampagneName) {
  const TC = `"${typeCampagneName}"`;
  const result = await pool.query(
    `SELECT d.status, p.push_campagne_name,t.name FROM discussions as d,pushs_campagnes as p,types_campagnes AS t WHERE (t.name=${TC} AND d.isDelete=0 AND t.isDelete=0 AND d.status='deleted')`
  );
  return result[0];
}

module.exports = {
  getDiscussions,
  getDiscussionById,
  insertDiscussion,
  updateStatusDiscussion,
  getDiscussionsByStatus,
  getDiscussionByTypeCampaignNameAndStatus,
  countSentMessageBytypeCampagne,
  countFailedMessageBytypeCampagne,
  countPendingMessageBytypeCampagne,
  countDeletedMessageBytypeCampagne,
};
