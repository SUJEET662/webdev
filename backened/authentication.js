// import express from 'express';
// import cors from 'cors';
// import morgan from "morgan";
// import fs from "fs";
// import jwt from "jsonwebtoken";

// const app = express();
// const PORT = 5000;

// app.use(express.json());
// app.use(cors());
// app.use(morgan('dev'))

// app.get('/', (req, res) => {
//   res.send("Backend is running");
// });

// app.post('/login', (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   console.log(email,password);

  
//   if (!email || !password) {
//     return res.status(400).json({
//       success: false,
//       message: "Email and password required"
//     });
//   }

//       const tokenGenereate = jwt.sign(
//         {email: email},
//         "secretkey",
//         {expiresIn: "1h"}   
//     );
  
//   if (email === "sy960004@gmail.com" && password === "1234") {
//     return res.status(200).json({
//       success: true,
//       token: tokenGenereate,
//       message: "Login successful"
//     });
//   }


//   return res.status(401).json({
//     success: false,
//     message: "Invalid credentials"
//   });
// });

// app.post('/signup', (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name ||!email ||!password) {
//     return res.status(400).json({
//       success: false,
//       message: "All fields are required"
//     });


//   }

//   let users = [];

//   if (fs.existsSync("./users.json")) {
//     const data = fs.readFileSync("./users.json");
//     users = JSON.parse(data);
//   }

//   const newUser = {
//     name,
//     email,
//     password
//   };

//   users.push(newUser);

//   fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

//   res.status(201).json({
//     success: true,
//     token: tokenGenereate,
//     message: "Signup successful",
//     user: newUser
//   });

// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import fs from "fs";
import jwt from "jsonwebtoken";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send("Backend is running");
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }
    const token = jwt.sign(
      { email: email },
      "shivam@123",
      { expiresIn: "1h" }
    );

  if (email === "sy960004@gmail.com" && password === "1234") {
    return res.status(200).json({
        token: token,
       success: true,
      message: "Login successful"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});


app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  let users = [];

  if (fs.existsSync("./users.json")) {
    const data = fs.readFileSync("./users.json");
    users = JSON.parse(data);
  }

  const newUser = { name, email, password };
  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  const token = jwt.sign(
    { email },
    "secretkey",
    { expiresIn: "1h" }
  );

  res.status(201).json({
    success: true,
    token: token,
    message: "Signup successful",
    user: newUser
  });
});


app.get('/profile', (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "No token provided"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, "secretkey");

    res.json({
      success: true,
      message: "Access granted",
      user: decoded
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});