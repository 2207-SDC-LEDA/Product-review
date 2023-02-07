import http from 'k6/http';
import {check} from 'k6';

var VUs = 10000

export let options = {
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      // It should start 30 iterations per `timeUnit`. Note that iterations starting points
      // will be evenly spread across the `timeUnit` period.
      rate: 1, // 200 RPS, since timeUnit is the default 1s
      // Our test should last 30 seconds in total
      duration: '30s',
      // It should start `rate` iterations per second
      timeUnit: '1s',
      // It should preallocate 2 VUs before starting the test
      preAllocatedVUs: VUs,
      // It is allowed to spin up to 50 maximum VUs to sustain the defined
      // constant arrival rate.
      maxVUs: VUs,
    },
  },
  discardResponseBodies: true,
};

export default function () {
  // let product_id = Math.round(Math.random() * (1000010 - 1) + 1);
  // const res = http.get(`http://localhost:8000/products/${product_id}`);
  // check(res, {
  //   "is status 200": (r) => r.status === 200,
  // })

  // let style_id = Math.round(Math.random() * (1958102 - 1) + 1);
  // let count = Math.round(Math.random() * (10 - 1) + 1)
  //   var addItem = {
  //     sku_id: style_id,
  //     count: count,
  //   }
  //   const res = http.post(`http://localhost:8000/products/cart`, JSON.stringify(addItem), {
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   //check item
  //   check(res, {
  //     'POST request return status 201': (r) => r.status === 201
  //   });

    const res = http.del(`http://localhost:8000/products/cart`)
    check(res, {
      'DELETE request return status 200': (r) => r.status === 200
    });
}