/*======= External Dependencies and Modules =======*/

/*======= Internal Modules or Files =======*/
// Types

export const errorHandler = (error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    errors: error.message,
  });
};
