const validateReq = (type, body) => {
  let PassErrorMsg;
  keys = Object.keys(type);
  console.log(keys);
  for (let val of keys) {
    console.log(val);
    if (val in body) {
      switch (type[val]) {
        case "string":
          if (typeof body[val] == "string") console.log("as expected string");
          else return "invalid parameters types";
          break;
        case "number":
          if (typeof body[val] == "number") console.log("as expected number");
          else return "invalid parameter types";
          break;
        case "password":
          if (typeof body[val] == "string" && isPassword(body[val]))
            console.log("its a string now lets check if its a password");
          else return "invalid password";
          break;
        case "email":
          if (typeof body[val] == "string" && isEmail(body[val]))
            console.log("it's a string now lets if  its a email");
          else return "email not valid!";
          break;
          break;
        default:
          console.log("intangible type");
      }
    } else {
      return `missing parameter: ${val}`;
    }
  }
  return false;
};

function isEmail(mail) {
  let check = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (check.test(mail)) {
    return true;
  }
  return false;
}

const isPassword = (password) => {
  let check = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,14})"
  );
  if (!check.test(password)) {
    return false;
  }
  return true;
};
module.exports = { validateReq };
