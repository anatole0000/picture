import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50,           // Số lượng người dùng ảo đồng thời
  duration: '20s',   // Tổng thời gian chạy test
};

export default function () {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJhYzQyZWYwNi02NmU1LTQ1MGEtYjY2ZS1kYTMxZTFkNjNjYjIiLCJpYXQiOjE3NTA0MDAxMDQsImV4cCI6MTc1MTAwNDkwNH0.zo4dArncq6DJm_7AzSqrABQwxh-1g_9I3luO-SeaFnE'; // ✅ Thay bằng token thật của bạn (nếu có auth)
  const url = 'http://localhost:4002/logic/8d61e908-484d-4ae7-9de5-7646fa79dcd6/comment';

  const payload = JSON.stringify({
    content: 'Load test comment from k6',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Nếu cần xác thực
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    'status is 201': (r) => r.status === 201,
  });

  sleep(1); // Chờ 1s mỗi lượt
}
