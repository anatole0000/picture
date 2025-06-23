import app from './app';

const PORT = process.env.PORT || 4004;

app.listen(PORT, () => {
  console.log(`Submission Service running on port http://localhost:${PORT}`);
});
