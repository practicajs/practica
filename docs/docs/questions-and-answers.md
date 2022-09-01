---
id: features
sidebar_position: 6
---

# Common questions and answers

## Testing your code

### Q: How to obtain a valid token to manually invoke the route (e.g., via POSTMAN)?

**Answer:** By default, Practica routes are guarded from unauthorized requests. The automated testing already embed valid tokens. Should you wish to invoke the routes manually a token must be signed.

Option 1 - Visit an online JWT token signing tool like [jwt builder](http://jwtbuilder.jamiekurtz.com/), change the key (bottom part of the form) to the key that is specified under ./services/order-service/config.ts/jwtTokenSecret/default. If you never changed it, the default secret is: ```just-a-default-secret```. Click the submit button and copy the generated token. 

Given the signed token, add a new header to your request with the name 'Authorization' and the value 'Bearer {put here the token}'


Option 2 - We already generated this token for you 👇, it should work with the default configuration in a development environment. Obviously, before going to production - the JWT secret must be changed:

```eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2NjIwMTY5NjIsImV4cCI6MTY5MzU1Mjk2MiwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.65ACAjHy2ZE5i_uS5hyiEkOQfkqOqdj-WtBm-w23qZQ```
