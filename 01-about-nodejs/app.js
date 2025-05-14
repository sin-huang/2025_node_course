// 使用 Promise 方式
// const fs = require('fs').promises;

// async function readFiles(){
//     console.time("讀取時間");
//     console.log("開始讀取檔案....")
//     try{
//         const data1 = await fs.readFile('file1.txt','UTF-8');
//         console.log("讀取 : file1.txt 完成");
//         console.log(data1);
        
//         const data2 = await fs.readFile('file2.txt','UTF-8');
//         console.log("讀取 : file2.txt 完成");
//         console.log(data2);
                                    
//         const data3 = await fs.readFile('file3.txt','UTF-8');
//         console.log("讀取 : file3.txt 完成");
//         console.log(data3);
        
//         return console.timeEnd("讀取時間");
//     }catch(e){
//         console.error("讀檔錯誤 : ", e);
//     }
// }

// const readTime = readFiles();
// console.log(readTime)

const myUrl = new URL('https://example.com/path?name=abby&age=24');

// console.log('主機名', myUrl.hostname); // example.com
// console.log('路徑名', myUrl.pathname); // /path
// console.log('搜尋參數name', myUrl.searchParams.get('name')); // abby
// console.log('搜尋參數age', myUrl.searchParams.get('age')); // 24
// console.log('完整搜尋字串', myUrl.search); // ?name=abby&age=24

// 新增搜尋參數
// myUrl.searchParams.append('habit','swimmimg');
// console.log(myUrl)

// 創建基本的 HTTP伺服器
// 引入http模組 assign給變數方便後續操作
const http = require('http')

const server = http.createServer((req,res)=>{
    // response要回傳怎麼樣的格式 設定好 假設都要是JSON
    res.setHeader('Content-type','application/json');
    // /首頁
    if(req.url === '/'){
        res.writeHead(200);
        res.end(JSON.stringify({ message : "success"}))
    }else{
        res.writeHead(404);
        res.end(JSON.stringify({ error : "can't find"}))
    }
})

server.listen(300, ()=>{
    console.log("http://localhost:3000")
})