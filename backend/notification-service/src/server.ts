import app from './app';
import { startConsumer } from './kafka/consumer';

const PORT = process.env.PORT || 4006;

app.listen(PORT, () => {
  console.log(`Notification Service running at http://localhost:${PORT}`);
});

startConsumer();