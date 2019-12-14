const request = require("supertest");
const app = require("./app");

describe("app", () => {
  describe("/health", () => {
    it("should return 200 OK while the app is running", done => {
      request(app)
        .get("/health")
        .expect(200, done);
    });
  });

  describe("/secret", () => {
    afterEach(() => {
      delete process.env.SECRET;
      delete process.env.PASSWORD;
    });
    beforeEach(() => {
      process.env.PASSWORD = "password";
      process.env.SECRET = "the secret";
    });

    it("should not return the secret if password is wrong", done => {
      request(app)
        .post("/secret")
        .send({ password: "nottherightpassword" })
        .expect(401)
        .expect("Wrong password...", done);
    });

    it("should not return the secret if password is wrong", done => {
      request(app)
        .post("/secret")
        .send({ password: "password" })
        .expect(200)
        .expect("the secret", done);
    });
  });
});
