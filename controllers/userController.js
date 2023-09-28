const {User, Thought} = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingle(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            if (!user) {
                return res.status(404).json({ message: 'error' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async updateUser(req,res){
        try{
            const updated = await User.findOne({ _id: req.params.userId});
            if(req.body.username){
                updated.username = req.body.username
            };
            if(req.body.email){
                updated.email = req.body.email
            };
            await updated.save();
            res.status(200).json(updated);
        }catch (err){
            res.status(500).json(err);
        }
    },
    async deleteUser(req,res){
        try{
           const deleted = await User.findOneAndDelete({ _id: req.params.userId});
            if (!deleted) {
                return res.status(404).json({ message: 'error' });
            }
            const deleteThoughts = await Thought.deleteMany({userId: req.params.userId});
            
            res.status(200).json({message: "User deleted!"}); 
        }catch (err){
            console.log(err);
            res.status(500).json(err);
        }
    }

}