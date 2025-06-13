const joi = require("joi");

const CreateTodoValidator = async (req, res, next) => {
  try {
    const payload = req.body;

    const schema = joi.object({
      task: joi.string().required(),
    });

    const ValidationResponse = await schema.validateAsync(payload);
    console.log({ ValidationResponse });

    if (ValidationResponse) {
      next();
    } else {
      return res.status(400).json({
        status: "error",
        message: "Invalid payload",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  CreateTodoValidator,
};
