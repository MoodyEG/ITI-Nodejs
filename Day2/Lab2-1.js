import http from 'node:http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
});

server.listen(5120, console.log('Server running at http://localhost:5120/'));

let users = [
  { id: 1, name: 'Jane' },
  { id: 2, name: 'John' },
  { id: 3, name: 'Moody' },
];

function addUser(user) {
  let id = 0;
  for (const u of users) {
    id = id > u.id ? id : u.id;
  }
  user.id = id + 1;
  const index = users.findIndex(
    (u) => u.name.toLowerCase() > user.name.toLowerCase()
  );
  if (index === -1) {
    users.push(user);
  } else {
    users.splice(index, 0, user);
  }
}

server.on('request', (req, res) => {
  if (
    req.method === 'GET' &&
    (req.url.toLowerCase() === '/getallusers' ||
      req.url.toLowerCase() === '/getusersorted')
  ) {
    // GET
    res.end(JSON.stringify(users));
  } else if (req.method === 'POST' && req.url.toLowerCase() === '/adduser') {
    // Post
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const user = JSON.parse(body);
      addUser(user);
      res.end(JSON.stringify(users));
    });
  } else if (
    req.method === 'DELETE' &&
    req.url.toLowerCase().startsWith('/deleteuser/')
  ) {
    // DELETE
    const id = req.url.split('/').pop();
    const len = users.length;
    users = users.filter((u) => u.id != id);
    if (users.length === len) {
      res.end('Not Found\n\n' + JSON.stringify(users));
    } else {
      res.end(JSON.stringify(users));
    }
  } else if (
    req.method === 'PUT' &&
    req.url.toLowerCase().startsWith('/updateuser/')
  ) {
    // PUT
    const id = req.url.split('/').pop();
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const user = JSON.parse(body);

      const index = users.findIndex((u) => u.id == id);
      if (index !== -1) {
        users[index].name = user.name;
        users.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
        );
        res.end(JSON.stringify(users));
      } else {
        res.end('Not Found\n\n' + JSON.stringify(users));
      }
    });
  } else if (
    req.method === 'GET' &&
    req.url.toLowerCase().startsWith('/searchuser/')
  ) {
    // GET
    const id = req.url.split('/').pop();
    const index = users.findIndex((u) => u.id == id);
    if (index !== -1) {
      res.end(JSON.stringify(users[index]));
    } else {
      res.end('Not Found\n\n' + JSON.stringify(users));
    }
  } else {
    res.end('Not Found');
  }
});
