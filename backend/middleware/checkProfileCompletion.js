const checkProfileCompletion = (req, res, next) => {
  const user = req.user;

  if (
    !user.fullname ||
    !user.phone ||
    !user.dob ||
    !user.gender ||
    !user.address ||
    !user.city ||
    !user.country ||
    !user.zipCode 
  ) {
    req.profileComplete = false;
  } else {
    req.profileComplete = true;
  }

  next();
};

module.exports = checkProfileCompletion;
