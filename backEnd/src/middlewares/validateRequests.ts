// middlewares/validateSignup.js
// export function validateSignup(req, res, next) {
//   const { username, email, password } = req.body;

//   if (!username || !email || !password) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   if (!email.includes("@")) {
//     return res.status(400).json({ error: "Invalid email format" });
//   }

//   if (password.length < 6) {
//     return res.status(400).json({ error: "Password must be at least 6 characters long" });
//   }

//   // If everything is fine → continue to controller
//   next();
// }
