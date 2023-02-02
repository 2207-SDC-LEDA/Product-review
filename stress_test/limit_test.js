import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      rate: 200, // 200 RPS, since timeUnit is the default 1s
      duration: '1m',
      preAllocatedVUs: 50,
      maxVUs: 100,
    },
  },
};

export default function () {
  http.get('http://localhost:8000/products/3');
}