const mongoose = require("mongoose");
let response = {};
exports.makeSchema = (name) => {
  let data = {};
  switch (name) {
    case 'User':
      data = {
        name: {
          type: String,
          required: true
        },
        email: {
          type: String,
          required: true,
          unique: true
        },
        password: {
          type: String,
          required: true,
          unique: true
        },
        is_admin: {
          type: Boolean,
        }
      };
      break;
    default:
      break;
  }
  try {
    const mgSchema = new mongoose.Schema(data,{timestamps : true});
    const schema = mongoose.model(name, mgSchema);
    response["ok"] = true;
    response["info"] = name;
    response["schema"] = schema;
  } catch (error) {
    response["ok"] = false;
    response["error"] = error;
    response["schema"] = name;
  }
  return response;
}
// Define a schema
// const userSchema = new mongoose.Schema({
//     name: {
//       type: String,
//       required: true
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     password: {
//       type: String,
//       required: true,
//       unique: true
//     },
//     is_admin: {
//         type: Boolean,
//     }
//   }, { timestamps: true });

// Create a model from the schema
// const User = mongoose.model('User', userSchema);