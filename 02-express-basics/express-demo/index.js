// const express = require('express')
// const app = express()
// const port = 3000
// app.use(express.json())

// const users = []

// app.get('/',(req, res)=>{
//     res.send('首頁 ALOHA')
// })

// // 拿到空的users陣列
// app.get('/api/users',(req, res)=>{
//     res.json(users)
// })

// app.post('/api/users', (req, res) => {
//     // 新增物件newUser 存id跟phone
//     const newUser = {
//       id: users.length + 1,
//     // 傳什麼樣的資訊給API
//       phone: req.body.phone
//     };
//     users.push(newUser);
//     res.status(201).json({  // 201 跟 200 的差異是 201 是建立新的資源
//       message: '使用者已建立',
//       user: newUser
//     });
//   });
// // :id 加上冒號是動態的
// app.put('/api/users/:id', (req, res)=>{
//     const userId = Number.parseInt(req.params.id);
//     const userIndex = users.findIndex(user => user.id === userId);

//     if (userIndex === -1) {
//         // 會回傳404狀態碼 然後丟出找不到使用者的訊息
//       return res.status(404).json({ message: '找不到該使用者' });
//     }

//     users[userIndex] = {
//       ...users[userIndex],
//       phone: req.body.phone
//     };

//     res.json({
//       message: '使用者已更新',
//       user: users[userIndex]
//     });
// })

// app.listen(port,()=>{
//     console.log('server is running on port 3000')
//     // 加上這個API路徑提醒 在server啟動時 可以直接複製到postman中測試
//     console.log(`Test GET: http://localhost:${port}/api/users`);
// })

// 實作練習 TODOS

const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

const todos = [];

// 取得所有代辦事項
app.get("/todos", (req, res) => {
  res.json(todos);
});

// 新增待辦事項
app.post("/todos", (req, res) => {
  // 使用console.log大法 把req印出來   
  // console.log(req)

  // 資料驗證
  req.body.map((todo,index)=>{
    if( !todo.title){
        return res.status(404).json({error:"代辦事項的title未填寫..."})
    }else if(typeof todo.completed!=='boolean'){
        return res.status(404).json({error:"代辦事項的completed未填寫..."})
    }
  })   
  // 驗證完必填欄位都有後 再打API新增
  const newTodos = req.body.map((todo,index)=>{
    console.log(todo)
    return {
        id: todos.length + index + 1,
        // 再發出POST請求時 資料要代入title、completed、createAt
        title: todo.title,
        completed: todo.completed,
        createdAt: new Date(),
    }
  }) 
  todos.push(newTodos);
  res.status(201).json({
    message: "新的代辦事項已建立",
    todo: newTodos,
  });
});

// 刪除指定之代辦事項
app.delete("/todos/:id", (req, res) => {
  // 先告訴我要刪哪個
  const todoId = Number.parseInt(req.body.id);
  // 依序遍歷 查看那個代辦事項在哪個位置   
  const todoIndex = todos.findIndex((todo) => todo.id === todoId);
  if(todoIndex===-1){
    return res.status(404).json({
        message: "找不到該代辦事項"
    })
  }
  // 把該代辦事項從todos陣列中移除
  todos.splice(todoIndex,1)
  res.json({
    message: `已成功刪除id為 ${todoId} 的代辦事項 `
  })   
});

// 啟動server
app.listen(port, () => {
  console.log(`伺服器運行在http://localhost:${port}`);
  console.log(`TEST POST 運行在 http://localhost:${port}/todos`);
});
