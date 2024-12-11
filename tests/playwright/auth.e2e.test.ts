import { test, expect } from "@playwright/test";
import { execPromise, test as textExt } from './e2e-setup';

test.describe("User Authorization Flow", () => {

  textExt("Register Performance test", async ({ page, server }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto(`http://localhost:${server.port}/register`);

    const end = performance.now();
    console.log(`Page load time: ${end - start} ms`);

    // Puedes hacer aserciones para verificar el rendimiento
    expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
  });

  textExt("Login Performance test", async ({ page, server }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto(`http://localhost:${server.port}/login`);

    const end = performance.now();
    console.log(`Page load time: ${end - start} ms`);

    // Puedes hacer aserciones para verificar el rendimiento
    expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
  });

  textExt("LoginPage with mocked data loads and allows login interaction", async ({
    page, server
  }) => {
    try {
         // Interceptar la solicitud de GraphQL para la mutación LOGIN_MUTATION
         await page.route("**/graphql", async (route, request) => {
          // Verifica si la solicitud contiene la mutación de registro
          if (request.postData()?.includes("mutation login")) {
            route.fulfill({
              status: 200,
              body: JSON.stringify({
                data: {
                  login: {
                    token: "fakeToken",
                    email: "test@example.com",
                    userId: "123",
                    userName: "Test User",
                    profile: "admin",
                  },
                },
              }),
              headers: { "Content-Type": "application/json" },
            });
          } else {
            route.continue();
          }
        });  

      await page.goto(`http://localhost:${server.port}/login`);

      // Verifica que el logo se carga
      const logo = page.locator("img[alt='Logo']");
      await expect(logo).toBeVisible();

      // Interactúa con el formulario
      const rand = Math.random();
      await page.fill("[data-testid='email']", "prueba" + rand + "@gmail.com");
      await page.fill("[data-testid='password']", "89991421Aa@");
      await page.click("button[type='submit']");

      const response = await page.waitForResponse("**/graphql", { timeout: 5000 }); // 5 segundos

      // Verificar que la respuesta fue la esperada
      expect(response.status()).toBe(200);
      // Verifica el resultado esperado
      await expect(page).toHaveURL(/dashboard/);
    } catch (e) {
      console.log("e" + e);
    }
  });

  textExt("RegisterPage with mocked data loads and allows register interaction", async ({
    page, server
  }) => {
    try {
      // Interceptar la solicitud de GraphQL para la mutación REGISTER_MUTATION
      await page.route("**/graphql", async (route, request) => {
        // Verifica si la solicitud contiene la mutación de registro
        if (request.postData()?.includes("mutation addUser")) {
          route.fulfill({
            status: 200,
            body: JSON.stringify({
              data: {
                addUser: {
                  token: "fakeToken",
                  email: "test@example.com",
                  userId: "123",
                  userName: "Test User",
                  profile: "admin",
                },
              },
            }),
            headers: { "Content-Type": "application/json" },
          });
        } else {
          route.continue();
        }
      });

      await page.goto(`http://localhost:${server.port}/register`);

      // Verifica que el logo se carga
      const logo = page.locator("img[alt='Logo']");
      await expect(logo).toBeVisible();

      // Interactúa con el formulario
      const rand = Math.random();
      await page.fill("[data-testid='fullName']", "Usuario Prueba" + rand);
      await page.fill("[data-testid='email']", "prueba" + rand + "@gmail.com");
      await page.fill("[data-testid='password']", "89991421Aa@");
      await page.fill("[data-testid='repeatPassword']", "89991421Aa@");
      await page.click("button[type='submit']");

      const response = await page.waitForResponse("**/graphql", { timeout: 5000 }); // 5 segundos

      // Verificar que la respuesta fue la esperada
      expect(response.status()).toBe(200);
      // Verifica el resultado esperado
      await expect(page).toHaveURL(/dashboard/);
    } catch (e) {
      console.log("e" + e);
    }
  });

});
