const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./../mongo_handler/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:19000/employer');

console.log('hello');
User.find({}, '_id user_id user_type email_id password', function (err, data) {
    if (err) console.log(err);
    data.forEach(async (user) => {
        let salt = await bcrypt.genSalt(10);
        let newPassword = await bcrypt.hash(user.password, salt);

        await User.update({ _id: mongoose.Types.ObjectId(user._id) }, { $set: { password: newPassword } });
    });
    console.log(data);
});
console.log('end');
