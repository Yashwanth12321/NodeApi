const user = require("../user");

describe("user", () => {
  it("should return user1", async () => {
    const req = { body: { username: "hii", password: "hello" } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    const newUser = await user.createNewUser(req, res, () => {});
    console.log(newUser);
  });
});
