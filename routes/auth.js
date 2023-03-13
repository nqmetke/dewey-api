const express = require('express');
const router = express.Router();


router.get("/", (req,res)=>{
    res.send("Heyo!");
});

router.post('/login', (req, res) => {
    // Get the username and password from the request body
    const { username, password } = req.body;
  
    // Find the user in the user database
    const user = users.find(u => u.username === username && u.password === password);
  
    // If the user is not found, return an error
    if (!user) return res.status(401).send('Invalid username or password');
  
    // If the user is found, create a JWT token
    const accessToken = jwt.sign({ username: user.username, name: user.name }, process.env.ACCESS_TOKEN_SECRET);
  
    // Return the token to the client
    res.json({ accessToken: accessToken });
  });

module.exports = router;
