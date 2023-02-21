// script.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  //user number
  vus: 100,
  //calling duration
  duration: '10s',
  //testing goal
  thresholds: {
    http_req_duration: ["p(99)<2000"],
    http_req_failed: ["rate<0.01"]
  }
};
// calling loop script
export default function () {
  let product_id = Math.round(Math.random() * (1000010 - 1) + 1);

  const res = http.get(`http://localhost:8000/products/${product_id}`);
  //check item
  check(res, {
    'GET request return status 200': (r) => r.status === 200 // GET
  });
  //break time
  sleep(1);
}
