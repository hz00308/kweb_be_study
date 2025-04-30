const express = require("express");

const app = express();
const port = 3000;

// /factorial 라우트
app.get('/factorial', (req, res) => res.redirect(`/factorial/${req.query.number}`));

// /factorial/:number 라우트
app.get('/factorial/:number', (req, res) => {
  const num = parseInt(req.params.number, 10); //req.params.number는 문자열이므로 정수로 변환!
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result *= i;
  }
  res.send(`number: ${num}, factorial result: ${result}`);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));