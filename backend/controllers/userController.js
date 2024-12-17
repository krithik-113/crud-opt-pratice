const {checkEmail, checkPhone} = require('../middleware/CheckingEmail');
const User = require('../models/userModels')

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
       return res.json({success:true,users})
    } catch (error) {
        console.log(error.message)
    }
}

const addUser = async (req, res) => {
    const { email, phone } = req.body
    const checking = checkPhone(phone)
    if (!checking.success) {
       return res.json(checking) 
    }
    try {
        const user = await User.findOne({ email })
        if (!user) {
            if (checkEmail(email)) {
                let newUser = new User(req.body);
                newUser = await newUser.save();
                return res.json({
                  success: true,
                  message: "Record Added",
                  newUser,
                });
            } else {
                  return res.json({ success: false, message: "Invalid email" });
            }
          
        }
        return res.json({success:false,message:"User email already exists"})
    } catch (err) {
        console.log(err.message)
    }
}

const userUpdate = async (req, res) => {
    const { id } = req.params
    const checking = checkPhone(req.body.phone);
    if (!checking.success) {
      return res.json(checking);
    }
    try {
        if (checkEmail(req.body.email)) {
               const updateUser = await User.findByIdAndUpdate(id, req.body);
               return res.json({
                 success: true,
                 message: "Updated Successfully!",
                 updateUser,
               }); 
        }
         return res.json({ success: false, message: "Invalid email" });
        } catch (err) {
        console.log(err.message)
    }
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    try {
        await User.findByIdAndDelete(id)
        return res.json({success:true})
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { addUser, userUpdate, getUsers, deleteUser };