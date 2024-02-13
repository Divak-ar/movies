const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;

// The whole async function is passed into the asyncHandler middleware to handle asynchronous operations gracefully within the Express route handler. asyncHandler is used for :- By wrapping the async function with asyncHandler, any errors that occur within the async function are caught and handled centrally, follows dry concept(do not repeat yourself) , no need to include try-catch blocks in every route handler
