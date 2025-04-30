const express = require("express");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true })); //사용자로부터 body 데이터 받기 위해 미들웨어 설정

app.get('/', (req, res) => {
  res.send(`
    <form method="post" action="/login">
      <div>
        <label>Username:</label>
        <input id="username-input" name="username" type="text">
      </div>
      <div>
        <label>Password:</label>
        <input id="password-input" name="password" type="password">
      </div>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  res.send(`username: ${username}<br>password: ${password}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
