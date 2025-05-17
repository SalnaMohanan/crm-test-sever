 const Campaigns = require('../models/campaignModel');

 exports.addCampaignController = async(req, res) => {
     console.log("Inside addCampaignController");
     const { campaignname, type, beginDate, endDate, status, description } = req.body;

     try {
         // Validate required fields
         if (!campaignname || !type || !beginDate || !endDate || !status || !description) {
             return res.status(400).json({ message: "All fields are required" });
         }

         const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

         const newCampaign = new Campaigns({
             campaignname,
             type,
             beginDate,
             endDate,
             status,
             description,
             image: imageUrl,
         });

         await newCampaign.save();
         res.status(201).json(newCampaign);
     } catch (error) {
         console.error("Error adding campaign:", error);
         res.status(400).json({ message: "Validation failed", error: error.message });
     }
 };

 //  get all 
 exports.getAllCampaigns = async(req, res) => {
     try {
         const campaigns = await Campaigns.find();
         res.status(200).json(campaigns);
     } catch (error) {
         console.error("Error fetching campaigns:", error);
         res.status(500).json({ message: "Internal Server Error" });
     }
 };


 // Delete Campaign Controller
 exports.deleteCampaign = async(req, res) => {
     try {
         const campaign = await Campaigns.findByIdAndDelete(req.params.id);
         if (!campaign) {
             return res.status(404).json({ message: "Campaign not found" });
         }
         res.status(200).json({ message: "Campaign deleted successfully" });
     } catch (error) {
         console.error("Error deleting campaign:", error);
         res.status(500).json({ message: "Internal Server Error" });
     }
 };

 // Get campaign by ID
 exports.getCampaignById = async(req, res) => {
     try {
         const campaign = await Campaigns.findById(req.params.id);
         if (!campaign) {
             return res.status(404).json({ message: "Campaign not found" });
         }
         res.status(200).json(campaign);
     } catch (error) {
         console.error("Error fetching campaign:", error);
         res.status(500).json({ message: "Internal Server Error" });
     }
 };

 // Update campaign by ID
 exports.updateCampaign = async(req, res) => {
     try {
         console.log("Updating campaign ID:", req.params.id); // Debugging line

         const updatedCampaign = await Campaigns.findByIdAndUpdate(
             req.params.id,
             req.body, { new: true }
         );

         if (!updatedCampaign) {
             return res.status(404).json({ message: "Campaign not found" });
         }

         res.status(200).json({ message: "Campaign updated successfully", campaign: updatedCampaign });
     } catch (error) {
         console.error("Error updating campaign:", error);
         res.status(500).json({ message: "Internal Server Error" });
     }
 };