const {
  getDiscussionById,
  getDiscussions,
  insertDiscussion,
  getDiscussionsByStatus,
  getDiscussionByTypeCampaignNameAndStatus,
  countSentMessageBytypeCampagne,
  countPendingMessageBytypeCampagne,
  countDeletedMessageBytypeCampagne,
  countFailedMessageBytypeCampagne,
} = require('../../models/ymanebot-models/discussions.model');

const typeCampagnes = ['Push Marketing', 'PUSH MEDIA', 'PUSH NEWSLETTER'];

async function httpGetDiscussions(req, res) {
  try {
    return res.status(200).json(await getDiscussions());
  } catch (error) {
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

async function httpGetDiscussionById(req, res) {
  const id = `"${req.params.id}"`;
  try {
    return res.status(200).json(await getDiscussionById(id));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

async function httpGetDiscussionByStatus(req, res) {
  const { status } = req.body;
  try {
    return res.status(200).json(await getDiscussionsByStatus(status));
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

async function httpInsertDiscussion(req, res) {
  const { id_discussion, message, numero, status, id_push_campaign } = req.body;
  try {
    const insert = await insertDiscussion(
      id_discussion,
      message,
      numero,
      status,
      id_push_campaign
    );
    if (insert) {
      return res.status(201).json(insert);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

async function httpGetDiscussionByTypeCampAndStatus(req, res) {
  const { status, typeCampaignName } = req.body;

  try {
    return res
      .status(200)
      .json(
        await getDiscussionByTypeCampaignNameAndStatus(typeCampaignName, status)
      );
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

async function httpCountDiscussionsBystatusAndTypeCampaign(req, res) {
  try {
    //get media messages by status
    const deliveredPushMediaMessages = await countSentMessageBytypeCampagne(
      typeCampagnes[1]
    );
    const failedPushMediaMessages = await countFailedMessageBytypeCampagne(
      typeCampagnes[1]
    );
    const pendingPushMediaMessages = await countPendingMessageBytypeCampagne(
      typeCampagnes[1]
    );
    const deletedPushMediaMessages = await countDeletedMessageBytypeCampagne(
      typeCampagnes[1]
    );

    //get maketing messages by status
    const deliveredPushMarketingMessages = await countSentMessageBytypeCampagne(
      typeCampagnes[0]
    );
    const failedPushMarketingMessages = await countFailedMessageBytypeCampagne(
      typeCampagnes[0]
    );
    const pendingPushMarketingMessages =
      await countPendingMessageBytypeCampagne(typeCampagnes[0]);
    const deletedPushMarketingMessages =
      await countDeletedMessageBytypeCampagne(typeCampagnes[0]);

    //get newsletter messages by status
    const deliveredNewsLetterMessages = await countSentMessageBytypeCampagne(
      typeCampagnes[2]
    );
    const failedNewsLetterMessages = await countFailedMessageBytypeCampagne(
      typeCampagnes[2]
    );
    const pendingNewsLetterMessages = await countPendingMessageBytypeCampagne(
      typeCampagnes[2]
    );
    const deletedNewsLetterMessages = await countDeletedMessageBytypeCampagne(
      typeCampagnes[2]
    );

    if (
      deliveredPushMediaMessages &&
      failedPushMediaMessages &&
      pendingPushMediaMessages &&
      deletedPushMediaMessages &&
      deliveredPushMarketingMessages &&
      failedPushMarketingMessages &&
      pendingPushMarketingMessages &&
      deletedPushMarketingMessages &&
      deliveredNewsLetterMessages &&
      failedNewsLetterMessages &&
      pendingNewsLetterMessages &&
      deletedNewsLetterMessages
    ) {
      const countDeliveredPushMediaMessages = deliveredPushMediaMessages.length;
      const countFailedPushMediaMessages = failedPushMediaMessages.length;
      const countPendingPushMediaMessages = pendingPushMediaMessages.length;
      const countDeletedPushMediaMessages = deletedPushMediaMessages.length;
      const countDeliveredPushMarketingMessages =
        deliveredPushMarketingMessages.length;
      const countFailedPushMarketingMessages =
        failedPushMarketingMessages.length;
      const countPendingPushMarketingMessages =
        pendingPushMarketingMessages.length;
      const countDeletedPushMarketingMessages =
        deletedPushMarketingMessages.length;
      const countDeliveredNewsLetterMessages =
        deliveredNewsLetterMessages.length;
      const countFailedNewsLetterMessages = failedNewsLetterMessages.length;
      const countPendingNewsLetterMessages = pendingNewsLetterMessages.length;
      const countDeletedNewsLetterMessages = deletedNewsLetterMessages.length;

      const dashboard = {
        pushMarketing: {
          received: countDeliveredPushMarketingMessages,
          failed: countFailedPushMarketingMessages,
          pending: countPendingPushMarketingMessages,
          deleted: countDeletedPushMarketingMessages,
        },
        pushMedia: {
          received: countDeliveredPushMediaMessages,
          failed: countFailedPushMediaMessages,
          pending: countPendingPushMediaMessages,
          deleted: countDeletedPushMediaMessages,
        },
        newsletter: {
          received: countDeliveredNewsLetterMessages,
          failed: countFailedNewsLetterMessages,
          pending: countPendingNewsLetterMessages,
          deleted: countDeletedNewsLetterMessages,
        },
      };

      return res.status(200).json(dashboard);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: 'something went wrong with the server',
    });
  }
}

module.exports = {
  httpInsertDiscussion,
  httpGetDiscussionById,
  httpGetDiscussions,
  httpGetDiscussionByStatus,
  httpGetDiscussionByTypeCampAndStatus,
  httpCountDiscussionsBystatusAndTypeCampaign,
};
