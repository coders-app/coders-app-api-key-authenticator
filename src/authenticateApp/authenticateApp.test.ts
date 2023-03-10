import appNames from "../utils/appNames.js";
import authenticateApp from "./authenticateApp.js";

const { apiGateway, identityServer } = appNames;

describe("Given the function authenticateApp", () => {
  const testKey = "key";

  describe("When it receives targetApp 'api-gateway', appToAuthenticate 'identity-server' and keyToAuthenticate 'key' and the key is correct", () => {
    test("Then it should return true", async () => {
      const isAuthenticatedResult = true;

      const isAuthenticated = await authenticateApp(
        apiGateway,
        identityServer,
        testKey
      );

      expect(isAuthenticated).toBe(isAuthenticatedResult);
    });
  });

  describe("When it receives targetApp 'identity-server', appToAuthenticate 'api-gateway' and keyToAuthenticate 'bad-key' and the key is incorrect", () => {
    test("Then it should return false", async () => {
      const isAuthenticatedResult = false;

      const isAuthenticated = await authenticateApp(
        identityServer,
        apiGateway,
        testKey
      );

      expect(isAuthenticated).toBe(isAuthenticatedResult);
    });
  });
});
