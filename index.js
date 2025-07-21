const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 8080;

// Enable CORS for all routes
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://adorable-kelpie-b00885.netlify.app');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Handle preflight OPTIONS requests
server.options('*', (req, res) => {
  res.sendStatus(200);
});

// Use default middlewares (logger, static, cors, and no-cache)
server.use(middlewares);

// Add custom routes
server.get('/goals', (req, res) => {
  res.jsonp(router.db.get('goals').value());
});

server.get(`/goals/:${id}`, (req, res) => {
  const goal = router.db.get('goals').find({ id: req.params.id }).value();
  if (goal) {
    res.jsonp(goal);
  } else {
    res.status(404).send('Goal not found');
  }
});

// Use the default router
server.use(router);

// Start the server
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
gi