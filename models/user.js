const { Schema, model } = require('mongoose');

const userSchema = Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            validate: {
                validator: function (v) {
                    //email regex
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Enter email"
            }
        },
        thoughts: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'Thought' }],

        friends: [{ 
            type: Schema.Types.ObjectId, 
            ref: 'User' }],
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

//friendCount
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = model('User', userSchema);

module.exports = User;