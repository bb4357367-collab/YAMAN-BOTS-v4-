const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Dashboard is running!');
});

function startDashboard() {
  app.listen(port, () => {
    console.log(`[Dashboard] Server listening on port ${port}`);
  });
}

module.exports = { startDashboard };
