# Number Classification API

A RESTful API built with NestJS that classifies numbers and provides interesting mathematical properties along with fun facts.

## Features

- **Number Classification**: Determines if a number is prime, perfect, or an Armstrong number.
- **Digit Sum**: Calculates the sum of the digits of the number.
- **Fun Fact**: Fetches an interesting fact about the number from [Numbers API](http://numbersapi.com/).
- **CORS Support**: Enables cross-origin requests for seamless integration with frontend applications.

## API Endpoint

### Classify a Number
**GET** `/api/classify-number?number=<number>`

#### Example Request
```bash
GET /api/classify-number?number=371
```
#### Response (200 OK)
```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

