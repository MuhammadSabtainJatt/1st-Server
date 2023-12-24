const mongoose = require("mongoose")
const express = require("express")
const router = express.Router()
const userModal = require("../Models/userModal")


router.get("/users", async (req, res) => {
    const userData = await userModal.find()
    res.json(userData)
    console.log('userData', userData)
})

router.get("/users/:id",async(req,res)=>{
    try {
        const userID=req.params.id
        const data=await userModal.findById(userID)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
router.post("/userpost", async (req, res) => {
    try {
        const userData = new userModal({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        })
        const result = await userData.save()
        res.json(result)
        console.log('result', result)
    }
    catch (error) {
        res.json({ error: error.message })
    }
})

router.delete("/deleteuser/:id", async (req, res) => {
    try {
        const userID = req.params.id
        console.log(userID)
        const deleteduser = await userModal.findByIdAndDelete(userID)
        if (!deleteduser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        console.log(deleteduser)
        res.status(200).json({ message: "User is Deleted Successfully" })
    } catch (error) {

        res.status(500).json({ error: error.message })
    }
})
router.put("/update/:id", async (req, res) => {
    try {
        const userID = req.params.id
        const dataforUpdation = new userModal({
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
        })
        const updated = await userModal.findByIdAndUpdate(userID, dataforUpdation,
            {
                new: true
            })
        console.log("updateData :", updated)
        if (!updated) {
            return res.status(404).json({ message: "user Not Fount" })
        }
        res.status(200).json({ message: "User Data is uodated successfully" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = router