const express = require('express');
const ymaneRouter = express.Router();
const multer = require("multer");

const { httpInsertBU,httpGetBu,httpUpdateBu,httpGetBuById,httpDeleteBu} = require('../controllers/ymanebot-controllers/bu.controllers');
const {httpInsertTypeCampagne,httpGetTypeCampagne,httpUpdateTypeCampagne,httpGetTypeCampagneById,httpDeleteTypeCampagne}=require('../controllers/ymanebot-controllers/typeCampagne.controller');
const {httpDeleteRole,httpInsertRole,httpUpdateRole,httpGetRoles}=require('../controllers/ymanebot-controllers/roles.controllers');
const {httpGetUsers,httpInsertUser,httpGetUserById,httpDeleteUser,httpUpdatetUser}=require('../controllers/ymanebot-controllers/users.controllers');
const {httpDeleteTypeContact,httpGetTypeContact,httpGetTypeContactById,httpGetTypeContactByName,httpInsertTypeContact,httpUpdateTypeContact} = require('../controllers/ymanebot-controllers/typeContact.controllers')
const {httpGetContacts,httpGetContactById,httpInsertContact}=require('../controllers/ymanebot-controllers/contact.controllers');
const {httpGetPushCampagne,httpGetPushCampagneById,httpInsertPushCampagne}=require('../controllers/ymanebot-controllers/pushCampagne.controller');
const {httpGetDiscussionById,httpGetDiscussions,httpInsertDiscussion}=require('../controllers/ymanebot-controllers/discussions.controllers')




/* const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../../public/assets/campaign/");
  },

  filename: function (req, file, cb) {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

 */

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, " ../../public/assets/campaign/");
    },
    filename: function(req, file, cb) {
    cb(null, file.originalname);
    }
    });
    
const upload = multer({ storage: storage });
 

ymaneRouter.get('/business_unit',httpGetBu);
ymaneRouter.get('/single-business_unit/:id',httpGetBuById);
ymaneRouter.post('/update-business_unit',httpUpdateBu);
ymaneRouter.post('/delete-business_unit',httpDeleteBu);
ymaneRouter.post('/business_unit',httpInsertBU);

ymaneRouter.get('/type_campagne',httpGetTypeCampagne);
ymaneRouter.get('/single-type_campagne/:id',httpGetTypeCampagneById);
ymaneRouter.post('/update-type_campagne',httpUpdateTypeCampagne);
ymaneRouter.post('/delete-type_campagne',httpDeleteTypeCampagne);
ymaneRouter.post('/type_campagne',httpInsertTypeCampagne);

ymaneRouter.get('/get-roles',httpGetRoles);
ymaneRouter.post('/delete-role',httpDeleteRole);
ymaneRouter.post('/update-role',httpUpdateRole);
ymaneRouter.post('/add-role',httpInsertRole);

ymaneRouter.get('/users',httpGetUsers);
ymaneRouter.post('/add-user',httpInsertUser);
ymaneRouter.post('/update-user',httpUpdatetUser);
ymaneRouter.post('/delete-user',httpDeleteUser);
ymaneRouter.get('/single-user/:id',httpGetUserById);

ymaneRouter.get('/contacts',httpGetContacts);
ymaneRouter.get('/single-contact/:id',httpGetContactById);
ymaneRouter.post('/add-contact',httpInsertContact);

ymaneRouter.get('/types-contacts',httpGetTypeContact);
ymaneRouter.get('/single-type_contact/:id',httpGetTypeContactById);
ymaneRouter.get('/single-type_contact-by_name/:name',httpGetTypeContactByName);
ymaneRouter.post('/add-type_contact',httpInsertTypeContact);
ymaneRouter.post('/delete-type_contact',httpDeleteTypeContact);
ymaneRouter.post('/update-type_contact',httpUpdateTypeContact);

ymaneRouter.get('/discussions',httpGetDiscussions);
ymaneRouter.get('/single-discussio/:id',httpGetDiscussionById);
ymaneRouter.post('/discussion',httpInsertDiscussion);

ymaneRouter.get('/push_campaigns',httpGetPushCampagne);
ymaneRouter.get('/single-campaign/:id',httpGetPushCampagneById);
ymaneRouter.post('/push_campaign', upload.single("media"), httpInsertPushCampagne);


module.exports = ymaneRouter;
