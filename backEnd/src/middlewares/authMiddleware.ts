// // middlewares/authMiddleware.js
// export function authMiddleware(req, res, next) {
//   if (!req.headers.authorization) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   next(); // pass control to the next handler
// }