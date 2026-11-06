// Demo accounts (fake login for Assignment 1, real login comes in Assignment 2)
const users = [
  {
    name: "Admin", // display name
    email: "admin@hussainis.com", // login email
    password: "admin123", // login password (only for demo!)
    role: "admin", // admin can open the dashboard
  },
  {
    name: "Ali",
    email: "ali@gmail.com",
    password: "ali123",
    role: "customer", // customer can order and reserve
  },
];

// share the users with other files
export default users;
