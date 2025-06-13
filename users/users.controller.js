const UserService = require("./users.service");

const CreateUser = async (req, res) => {
  const payload = req.body;
  const ServiceResponse = await UserService.CreateUser(payload);
  res
    .status(ServiceResponse.status)
    .json(ServiceResponse.data || ServiceResponse.message);
};

const LoginUser = async (req, res) => {
  const payload = req.body;
  const ServiceResponse = await UserService.LoginUser(payload);
  res
    .status(ServiceResponse.status)
    .json(ServiceResponse.data || ServiceResponse.message);
};

module.exports = {
  CreateUser,
  LoginUser,
};
