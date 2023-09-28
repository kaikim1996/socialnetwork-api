const { User, Thought } = require('../models');

module.exports = {
    async getThoughts(req,res) {
        try{
            const thoughts = await Thought.find()
            .select('-__v');
          
            res.status(200).json(thoughts);
        }catch (err){
            res.status(500).json(err);
            console.log(err);
        }
    },
    async getSingle(req,res){
        try{    
            const singleThought = await Thought.findOne({_id: req.params.thoughtId})
                .select('-__v');
            if(!singleThought){
                return res.status(404).json({message: "error"})
            }
            res.status(200).json(singleThought);

        }catch(err){
            res.status(500).json(err);
        }
    },
    async createThought(req,res){
        try{
            if(!req.body.thoughtText || !req.body.userId ||!req.body.username){
                return res.json({message: "info missing"});
            }
            const newThought = await Thought.create(req.body);
            await newThought.save();
            const updateUser = await User.findOneAndUpdate({ _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true });
            res.status(200).json(newThought);
        }catch(err){
            res.status(500).json(err);
        }
    },
    async updateThought(req,res){
        try{
            const updated = await Thought.findOne({_id: req.params.thoughtId});
            updated.thoughtText = req.body.thoughtText;
            await updated.save();
            res.status(200).json(updated);
        }catch(err){
            res.status(500).json(err)
        }
    },
    
}
