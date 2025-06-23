import app from './app';
import { connectKafka } from './kafka/producer';

const PORT = process.env.PORT || 4002;

connectKafka().then(() => {
  console.log('✅ Kafka connected');
});

app.listen(PORT, () => {
  console.log(`LogicLab Service running at http://localhost:${PORT}`);
});
