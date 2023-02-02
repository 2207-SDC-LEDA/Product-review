// script.js
import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
  //user number
  vus: 1,
  //calling duration
  duration: '3s',
  //testing goal
  thresholds: {
    http_req_duration: ["p(99)<2000"],
    http_req_failed: ["rate<0.01"]
  }
};
// calling loop script
// using group create steps
export default function () {
  group('Add and remove item from cart', function () {
      group('add item to cart', function () {
        let style_id = Math.round(Math.random() * (1958102 - 1) + 1);
        let count = Math.round(Math.random() * (10 - 1) + 1)
          var addItem = {
            sku_id: style_id,
            count: count,
          }
          const res = http.post(`http://localhost:8000/products/cart`, JSON.stringify(addItem), {
            headers: { 'Content-Type': 'application/json' }
          });
          //check item
          check(res, {
            'POST request return status 201': (r) => r.status === 201
          });
          //break time
          sleep(1);
      });
      group('clear the cart', function () {
        const res = http.del(`http://localhost:8000/products/cart`)
        check(res, {
          'DELETE request return status 200': (r) => r.status === 200
        });
        //break time
        sleep(1);
      });
  });
}

