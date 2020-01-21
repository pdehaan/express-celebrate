# Express + Celebrate test

Messing around with [**celebrate**](https://www.npmjs.com/package/celebrate), "an express middleware function that wraps the joi validation library".

```sh
npm start
# Server is started... http://localhost:3000/
```

URLs to test:

1. <http://localhost:3000/>
    OUTPUT: `Hello, {"name":"stranger}`
2. <http://localhost:3000/?name=foo>
    OUTPUT: `Hello, {"name":"foo"}`
3. <http://localhost:3000/?name=foo?age=33>
    OUTPUT: `Hello, {"name":"foo","age":33}`
4. <http://localhost:3000/?name=foo&age=steven>
    OUTPUT: `{"statusCode":400,"error":"Bad Request","message":"\"age\" must be a number","validation":{"source":"query","keys":["age"]}}`
5. <http://localhost:3000/?name=foo&status=false>
    OUTPUT: `{"statusCode":400,"error":"Bad Request","message":"\"status\" is not allowed","validation":{"source":"query","keys":["status"]}}`
6. <http://localhost:3000/name?name=foo>
    OUTPUT: `/name is, "foo"`
7. <http://localhost:3000/name>
    OUTPUT: `{"statusCode":400,"error":"Bad Request","message":"\"name\" is required","validation":{"source":"query","keys":["name"]}}`