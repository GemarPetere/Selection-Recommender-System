
const User = require("../models/User");

exports.signup = (req, res) => {
    console.log("req.body", req.body);
  
    User.findOne({ email: req.body?.email }, (err, user) => {
      if (err) {
        return res.status(400).json({
          error: dbErrorHandler(err),
        });
      }
  
      if (user) {
        return res.status(400).json({
          error:
            "This email is already registered, please login to this email instead, you can also use this email to reset your password",
        });
      }
  
      const newUser = new User(req.body);
      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({
            error: dbErrorHandler(err),
          });
        }
        // Not includes sensitive password
        user.salt = undefined;
        user.hashed_password = undefined;
        if (req.body.role == 1) {
          let newShop = new Shop({
            name: `${user.name}'s Shop`,
            user: user._id,
            address: user.address,
            long: req.body.long,
            lat: req.body.lat,
            pickUpNotes: req.body.pickUpNotes || "",
            location: {
              type: "Point",
              coordinates: [parseFloat(req.body.long), parseFloat(req.body.lat)],
            },
          });
  
          newShop.save((err, shop) => {
            if (err) {
              return res.status(400).json({
                error: dbErrorHandler(err),
              });
            }
            res.json({
              user,
              shop,
            });
          });
        } else {
          res.json({
            user,
          });
        }
      });
    });
  };