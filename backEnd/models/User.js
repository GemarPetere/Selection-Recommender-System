const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collectionName = "all-users";
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const data = {
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
  about: {
    type: String,
    trim: true,
  },
  hashed_password: {
    type: String,
  },
  salt: String,
  role: {
    type: Number,
    default: 0,
  },
  history: {
    type: Array,
    default: [],
  },
  favoriteList: {
    type: Schema.ObjectId,
    ref: "Product",
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
  },
  address: {
    type: String,
    trim: true,
  },
  gender: {
    type: String,
    trim: true,
  },
  messenger: {
    type: String,
    trim: true,
  },
  birthdate: {
    type: String,
    trim: true,
  },
  photo: {
    type: String,
    default: "",
  },
  deviceId: {
    type: String,
    default: "",
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  google: {
    id: {
      type: String,
    },
    metadata: {},
  },
  facebook: {
    id: {
      type: String,
    },
    metadata: {},
  },
  phoneOTP: String,
  phoneOTPExpiration: Date,
  resetToken: String,
  expireToken: Date,
  emailVerificationToken: String,
  emailVerificationTokenExpiration: String,
  long: { type: String, default: "120.9890" },
  lat: { type: String, default: "14.6038" },
};
const userSchema = new Schema(data, { timestamps: true });

// virtual field to set an encrypted password
userSchema
  .virtual("password") // Here 'password' is now a property on User documents.
  .set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

userSchema.methods = {
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
};

module.exports = mongoose.model("User", userSchema, collectionName);
