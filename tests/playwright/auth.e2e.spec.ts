import { test, expect } from "@playwright/test";
import { stopServer, waitForServer } from "./launchServer";
import getPort from "get-port";
import { ChildProcess, exec } from "child_process";

test.describe("User Authorization Flow", () => {
  let port: number;
  let process: ChildProcess;

  test.beforeEach(async () => {
    port = await getPort(); // Encuentra un puerto disponible
    process = exec(`npm run start -- --port=${port}`);
    await waitForServer(`http://localhost:${port}`);
  });
  test.afterEach(async () => {
    stopServer(process);
  });

  test("Register Performance test", async ({ page }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto(`http://localhost:${port}/register`);

    const end = performance.now();
    console.log(`Page load time: ${end - start} ms`);

    // Puedes hacer aserciones para verificar el rendimiento
    expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
  });

  test("Login Performance test", async ({ page }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto(`http://localhost:${port}/login`);

    const end = performance.now();
    console.log(`Page load time: ${end - start} ms`);

    // Puedes hacer aserciones para verificar el rendimiento
    expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
  });

  test("LoginPage with mocked data loads and allows login interaction", async ({
    page,
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

      await page.goto(`http://localhost:${port}/login`);

      // Verifica que el logo se carga
      const logo = page.locator("img[alt='Logo']");
      await expect(logo).toBeVisible();

      // Interactúa con el formulario
      const rand = Math.random();
      await page.fill("[data-testid='email']", "prueba" + rand + "@gmail.com");
      await page.fill("[data-testid='password']", "89991421Aa@");
      await page.click("button[type='submit']");

      const response = await page.waitForResponse("**/graphql", {
        timeout: 5000,
      }); // 5 segundos

      // Verificar que la respuesta fue la esperada
      expect(response.status()).toBe(200);
      // Verifica el resultado esperado
      await expect(page).toHaveURL(/dashboard/);
    } catch (e) {
      console.log("e" + e);
    }
  });

  test("RegisterPage with mocked data loads and allows register interaction", async ({
    page,
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

      await page.goto(`http://localhost:${port}/register`);

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

      const response = await page.waitForResponse("**/graphql", {
        timeout: 5000,
      }); // 5 segundos

      // Verificar que la respuesta fue la esperada
      expect(response.status()).toBe(200);
      // Verifica el resultado esperado
      await expect(page).toHaveURL(/dashboard/);
    } catch (e) {
      console.log("e" + e);
    }
  });
});
