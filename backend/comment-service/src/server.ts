import app from './app';

const PORT = process.env.PORT || 4007;

app.listen(PORT, () => {
  console.log(`💬 Comment Service running at http://localhost:${PORT}`);
});
