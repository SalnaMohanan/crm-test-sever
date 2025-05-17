const express = require('express')
const userController = require('../controllers/userController')
const upload = require('../middlewares/uploads')
const campaignController = require('../controllers/campaignController')
const leadController = require('../controllers/leadController')
const followupController = require('../controllers/followupController')
const customerController = require('../controllers/customerController')
const contactController = require('../controllers/contactController')
const authMiddleware = require('../middlewares/authMiddlewares')
const roleMiddleware = require('../middlewares/roleMiddleware') // ✅

const router = express.Router()

// Registration and Login — no auth needed
router.post('/register', userController.addUserController)
router.post('/login', userController.loginController)

// ✅ Manager-only: add campaign
router.post(
  '/add-campaign',
  authMiddleware,
  roleMiddleware(['manager']),
  upload.single('image'),
  campaignController.addCampaignController
)

// ✅ Manager and salesperson can view campaigns
router.get(
  '/campaigns',
  authMiddleware,
  roleMiddleware(['manager', 'salesperson']),
  campaignController.getAllCampaigns
)
router.get(
  '/campaigns/:id',
  authMiddleware,
  roleMiddleware(['manager', 'salesperson']),
  campaignController.getCampaignById
)

// ✅ Manager-only
router.delete(
  '/campaigns/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  campaignController.deleteCampaign
)
router.put(
  '/campaigns/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  campaignController.updateCampaign
)

// ✅ Manager can add lead
router.post(
  '/add-lead',
  authMiddleware,
  roleMiddleware(['manager']),
  leadController.addLeadController
)

// ✅ Manager can view all leads
router.get(
  '/all-leads',
  authMiddleware,
  roleMiddleware(['manager','salesperson']),
  leadController.getAllLeadsController
)

// ✅ Manager can view salesperson list
router.get(
  '/salespersons',
  authMiddleware,
  roleMiddleware(['manager']),
  userController.getSalespersons
)

// ✅ Manager and salesperson can view individual leads
router.get(
  '/lead-view/:id',
  authMiddleware,
  roleMiddleware(['manager', 'salesperson']),
  leadController.getLeadById
)

// ✅ Salesperson only can edit/delete their leads
router.delete(
  '/leads/:id',
  authMiddleware,
  roleMiddleware(['manager','salesperson']),
  leadController.deleteLead
)
router.put(
  '/leads/:id',
  authMiddleware,
  roleMiddleware(['manager','salesperson']),
  leadController.updateLead
)

// ✅ Followup - for both roles
router.post(
  '/followup-add',
  authMiddleware,
  roleMiddleware(['salesperson']),
  followupController.addFollowup
)
router.get(
  '/follow-up',
  authMiddleware,
  roleMiddleware(['manager']),
  followupController.getAddedFollowp
)
router.get(
  '/followup-view/:id',
  authMiddleware,
  roleMiddleware(['manager', 'salesperson']),
  followupController.getFollowupById
)

// ✅ Customer routes
router.post(
  '/customer-add',
  authMiddleware,
  roleMiddleware(['salesperson']),
  customerController.addCustomer
)
router.get(
  '/customers',
  authMiddleware,
  roleMiddleware(['manager']),
  customerController.getAddedCustomers
)
router.get(
  '/customer-view/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  customerController.getCustomerById
)
router.put(
  '/customer-edit/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  customerController.updateCustomerById
)
router.delete(
  '/customer-delete/:id',
  authMiddleware,
  roleMiddleware(['manager']),
  customerController.deleteCustomerById
)

// Contact — public
router.post('/contact', contactController.submitContactForm)

module.exports = router
