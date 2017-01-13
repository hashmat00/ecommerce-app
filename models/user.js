var mongoose = require("mongoose");
var bcrypt = require("bcrypt-nodejs");
// var passportLocalMongoose = require('passport-local-mongoose');
var Schema = mongoose.Schema;


var UserSchema = new Schema ({
    email: { type: String, unique: true, lowercase: true},
    password: String,
    
    profile: {
        name: { type: String, default: ''},
        picture: { type: String, default: ''}
    },
    
    address: String,
    history: [{
        date: Date,
        paid: { type: Number, default: 0},
    }]
});


//===== USE THIS PASSPORT INSTEAD OF BCRYPT TO INCRYPT PASSWOR D=====
// UserSchema.plugin(passportLocalMongoose);



//===== USE BCRPT TO INCRYPT PASSWORD =====
// hash the password with bcrypt
UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('passwor')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if (err) return next();
            user.password = hash;
            next();
        });
    });
});



// compare user password with db 
UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};



//===== USE function to set defautl username for all users when they sign up=====
// UserSchema.pre('save', function(next){
//     var user = this;
//     user.name = 'specify name';
// });



module.exports = mongoose.model('User', UserSchema);