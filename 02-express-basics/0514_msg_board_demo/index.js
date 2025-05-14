const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const messages = [];

app.get("/api/messages", (req, res) => {
  res.json(messages);
});

app.post("/api/messages", (req, res) => {
  const { content, author } = req.body;
  // 定義要丟過去API的資料格式
  const newMessage = {
    // 用時間戳當作id
    id: Date.now().toString(),
    content: content,
    author: author,
  };

  // 將新增的這個留言加入到留言區中
  messages.push(newMessage);

  // 定義回應狀態
  res.status(201).json({
    message: "留言已新增成功",
    msg: newMessage,
  });
});

app.put("/api/messages/:id", (req, res) => {
  // 先抓到req請求要改哪個留言 有兩種寫法
  // const msgId = Number.parseInt(req.body.id);
  // 或是
  const { msgId } = req.params;
  const msgIndex = messages.findIndex((msg) => (msg) => msg.id === msgId);

  // 如果留言不存在 返回404
  if (msgIndex === -1) {
    return res.status(404).json({
      message: "找不到該留言",
    });
  }

  // 存在 就修改
  messages[msgIndex] = {
    ...messages[msgIndex],
    content: req.body.content,
  };

  // 最後回傳成功
  res.json({
    message: "留言已更新",
    msg: messages[msgIndex],
  });
});

app.delete("/api/messages/:id", (req, res) => {
  const msgId = req.params.id;
  console.log(msgId);
  const msgIndex = messages.findIndex((msg) => msg.id === msgId);

  if (msgIndex === -1) {
    return res.status(404).json({ message: "找不到該留言" });
  }

  messages.splice(msgIndex, 1);
  res.json({ message: `留言 ${msgId} 已刪除` });
});

app.listen(port, () => {
  console.log(`伺服器成功啟動: http://localhost:${port}/api/messages`);
});

// 測試資料區
// {
//     "content": "UCLA",
//     "author": "melody"
// }
// {
//     "content": "Hello",
//     "author": "eric"
// }
// {
//     "content": "yahoo",
//     "author": "tiffany"
// }