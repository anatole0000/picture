// src/server.ts
import app from './app';

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`✅ Progress service is running at http://localhost:${PORT}`);
});
