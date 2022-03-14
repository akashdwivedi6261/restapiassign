const http = require("http");
const users = require("./users.json")
const PORT = 8000;
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');

  if(req.url=="/" && req.method === "GET") {
      res.write("Hello, Welcome to my server");
      res.end
  }
  else if(req.url === "/users" && req.method === "GET") {
      res.end(JSON.stringify(users))
  }

  else if(req.method === "POST" && req.url === "/users") {
      // console.log("Request:", req);
      let content = ''
     req.on('data', (data) => {
       content += data
     })
    //  console.log("content", JSON.stringify(content));
     req.on('end', () => {
       let jsonData;
       try {
         jsonData = JSON.parse(content)
       }
       catch(err) {
        res.statusCode = 400
         res.end('{"Error occured"}')
       }
       users.push(jsonData)
       res.end(JSON.stringify(jsonData))
     })
  }

  else if(req.url === "/user" && req.method === "PATCH") {
    let content='';
    console.log("inside");
    req.on('data', (data) => {
      content += data
    })

    req.on('end', () => {
      let jsonData;

      try {
        //  res.statusCode = 200
        jsonData = JSON.parse(content);
      }
      catch (err) {
        res.statusCode=400
        res.end(`{"error occured"}`)
      }

      let user = users.find((user) => user.id === jsonData.id)
      user.first_name = jsonData.first_name;
      user.last_name = jsonData.last_name;
      res.end(JSON.stringify(user))
    })
  }
  else if(req.url === "/user" && req.method === "DELETE") {
    let content='';
    console.log("inside");
    req.on('data', (data) => {
      content += data
    })

    req.on('end', () => {
      let jsonData;

      try {
        //  res.statusCode = 200
        jsonData = JSON.parse(content);
      }
      catch (err) {
        res.statusCode=400
        res.end(`{"error occured"}`)
      }

      let user = users.filter((user) => user.id !== jsonData.id)
      res.end(JSON.stringify(user))
    })
  }
})


server.listen(PORT, () => {
    console.log("Starting server");
})