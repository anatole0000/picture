import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'notification-service',
  brokers: ['localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'notif-group' });

export const startConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'notifications', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic: _topic, partition: _partition, message }: { topic: string; partition: number; message: any }) => {
      const value = message.value?.toString();
      const data = value ? JSON.parse(value) : null;

      if (data) {
        console.log(`🔔 Notification received:`, data);
        // Tùy bạn: lưu vào DB, gửi socket, v.v.
      }
    },
  });

  console.log('✅ Notification Consumer is running');
};
