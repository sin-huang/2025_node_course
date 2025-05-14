const express = require("express");
const app = express();
const port = 3000;

const users = [];
app.use(express.json());

const requestTimer = (req, res, next) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const endTime = Date.now();
    const duration = endTime - startTime;
    console.log(`請求時間 ${duration} ms`);
    console.log(req);

    const log = {
      timestamp: new Date().toISOString,
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
    };

    console.log(log);
  });

  next();
};

app.use(requestTimer);

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    phone: req.body.phone,
  };
  users.push(newUser);
  res.status(201).json({
    // 201 跟 200 的差異是 201 是建立新的資源
    message: "使用者已建立",
    user: newUser,
  });
});

app.listen(port, () => {
  console.log(`伺服器以成功啟動 http://localhost:${port}`);
  console.log(`伺服器以成功啟動 http://localhost:${port}/api/users`);
});
