import createError from "http-errors";

// err 400
export const badRequest = (err, res) => {
  const error = createError.BadRequest(err);
  return res.status(error.status).json({
    error: 1,
    message: error.message,
  });
};

// err 404
export const notFound = (req, res) => {
  const error = createError.NotFound();
  return res.status(error.status).json({
    error: 1,
    message: error.message,
  });
};

// err 500
export const internalServerError = (res) => {
  const error = createError.InternalServerError();
  return res.status(error.status).json({
    error: 1,
    message: error.message,
  });
};
