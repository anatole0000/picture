import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'logic-service',
  brokers: ['localhost:9092'], // sửa nếu chạy docker khác
});

export const producer = kafka.producer();

export const connectKafka = async () => {
  await producer.connect();
};
