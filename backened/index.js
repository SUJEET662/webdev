import express from 'express';
import cors from 'cors';
import morgan from "morgan";
import fs from "fs";

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send("Backend is running");
});

app.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password);

  
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password required"
    });
  }

  
  if (email === "sy960004@gmail.com" && password === "1234") {
    return res.status(200).json({
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

  if (!name ||!email ||!password) {
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

  const newUser = {
    name,
    email,
    password
  };

  users.push(newUser);

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.status(201).json({
    success: true,
    message: "Signup successful",
    user: newUser
  });

});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});