export const handleError = (res, err, controllerName = "") => {
  // console.log(`Error in ${controllerName}:`, err.message);
  return res
    .status(500)
    .json({ message: "Some Internal server error occurred", success: false });
};
