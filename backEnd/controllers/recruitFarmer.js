const { debErrorHandler } = require("../helpers/dbErrorHandler")
const mongoose = require("mongoose")
const RecruitFarmer = require("../models/RecruitmentForm")

exports.recruit = (req, res) =>{
     // TODO: add validation that user has already sent a rating from this order for this product $ne: $message
    const { 
        firstName, middleName,
        lastName, address,
        gender, birthdate,
        age, status,
        religion, contactNo,
        landArea
    } = req.body

    if(!firstName || !middleName || 
        !lastName || !address || 
        !gender || !birthdate || 
        !age || !status ||
        !religion || !contactNo ||
        !landArea){
            return res.status(400).json({ error: "One of the data is Undefined"})
        }
     /* Review.findOne({ name })
     .then(review => {
     //     // check if the product
      if(review) return res.status(400).json({ error: "The review already exists"})
     }) */

    const newRecruit = new RecruitFarmer(req.body);
    newRecruit.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: dbErrorHandler(err)
            });
        }
        res.status(200).json({ data });
    });
}