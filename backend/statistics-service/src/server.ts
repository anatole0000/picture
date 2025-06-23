import app from './app';

const PORT = process.env.PORT || 4005;

app.listen(PORT, () => {
  console.log(`Statistic Service running on http://localhost:${PORT}`);
});
