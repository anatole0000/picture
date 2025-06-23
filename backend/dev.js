const concurrently = require('concurrently');

concurrently(
  [
    { name: 'user', command: 'cd user-service && npm run dev', prefixColor: 'blue' },
    { name: 'comment', command: 'cd comment-service && npm run dev', prefixColor: 'magenta' },
    { name: 'logiclab', command: 'cd logiclab-service && npm run dev', prefixColor: 'cyan' },
    { name: 'submission', command: 'cd submission-service && npm run dev', prefixColor: 'green' },
    { name: 'progress', command: 'cd progress-service && npm run dev', prefixColor: 'yellow' },
    { name: 'statistics', command: 'cd statistics-service && npm run dev', prefixColor: 'red' },
    { name: 'notification', command: 'cd notification-service && npm run dev', prefixColor: 'gray' },
  ],
  {
    prefix: 'name',
    killOthers: ['failure', 'success'],
    raw: false, // Đặt `true` nếu bạn không muốn prefix màu
  }
)
