---
id: questions
sidebar_position: 6
sidebar_label: Common questions
---

# Common questions and answers

## Testing your code

### Q: How to obtain a valid token to manually invoke the route (e.g., via POSTMAN)?

**Answer:** By default, Practica routes are guarded from unauthorized requests. The automated testing already embed valid tokens. Should you wish to invoke the routes manually a token must be signed.

Option 1 - Visit an online JWT token signing tool like [jwt builder](http://jwtbuilder.jamiekurtz.com/), change the key (bottom part of the form) to the key that is specified under ./services/order-service/config.ts/jwtTokenSecret/default. If you never changed it, the default secret is: ```just-a-default-secret```. Click the submit button and copy the generated token. 

Given the signed token, add a new header to your request with the name 'Authorization' and the value 'Bearer {put here the token}'


Option 2 - We already generated this token for you 👇, it should work with the default configuration in a development environment. Obviously, before going to production - the JWT secret must be changed:

```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4NTIyMTk5NzEsImRhdGEiOnsidXNlciI6ImpvZSIsInJvbGVzIjoiYWRtaW4ifSwiaWF0IjoxNzEyMjUyMjE5fQ.kUS7AnwtGum40biJYt0oyOH_le1KfVD2EOrs-ozclY0```
