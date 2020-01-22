const axios = require("axios");

describe("/ route", () => {
  test("sets a default name, if not provided", async () => {
    const res = await fetcher();
    expect(res.status).toBe(200);
    expect(res.statusText).toBe("OK");
    expect(res.data).toEqual(`Hello, {"name":"stranger"}`);
    return res;
  });

  test("uses the specified name, if provided", async () => {
    const res = await fetcher("", { name: "Juan" });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe("OK");
    expect(res.data).toEqual(`Hello, {"name":"Juan"}`);
  });

  test("uses the optional `age` property, if provided", async () => {
    const res = await fetcher("", { name: "Juan", age: 55 });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe("OK");
    expect(res.data).toEqual(`Hello, {"name":"Juan","age":55}`);
  });

  test("throws an error if extra parameters are provided", async () => {
    const res = await fetcher("", { name: "Juan", extra: true });
    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Bad Request");
    expect(res.data).toEqual({
      statusCode: res.status,
      error: res.statusText,
      message: `"extra" is not allowed`,
      validation: { keys: ["extra"], source: "query" }
    });
  });

  test("displays all errors if more than one extra parameters are provided", async () => {
    const res = await fetcher("", {
      name: "Juan",
      extra1: true,
      extra2: false
    });
    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Bad Request");
    expect(res.data).toEqual({
      statusCode: res.status,
      error: res.statusText,
      message: `"extra1" is not allowed. "extra2" is not allowed`,
      validation: { keys: ["extra1", "extra2"], source: "query" }
    });
  });
});

describe("/name route", () => {
  test("throws an error if required parameter is missing", async () => {
    const res = await fetcher("/name");
    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Bad Request");
    expect(res.data).toEqual({
      statusCode: res.status,
      error: res.statusText,
      message: `"name" is required`,
      validation: { source: "query", keys: ["name"] }
    });
  });

  test("uses the specified name, if provided", async () => {
    const res = await fetcher("/name", { name: "Juan" });
    expect(res.status).toBe(200);
    expect(res.statusText).toBe("OK");
    expect(res.data).toBe(`/name is, "Juan"`);
  });

  test("throws an error if unexpected parameter is provided", async () => {
    const res = await fetcher("/name", { name: "Juan", extra: true });
    expect(res.status).toBe(400);
    expect(res.statusText).toBe("Bad Request");
    expect(res.data).toEqual({
      statusCode: res.status,
      error: res.statusText,
      message: `"extra" is not allowed`,
      validation: { source: "query", keys: ["extra"] }
    });
  });
});

async function fetcher(pathname = "", params = {}) {
  const uri = new URL("http://localhost:3000");
  uri.pathname = pathname;
  for (const [name, value] of Object.entries(params)) {
    uri.searchParams.append(name, value);
  }
  return axios.get(uri.href, { validateStatus: false });
}
