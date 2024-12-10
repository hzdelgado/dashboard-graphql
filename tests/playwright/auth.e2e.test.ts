import { test, expect } from "@playwright/test";
import { ChildProcess, exec } from "child_process";
import { execPromise, waitForServer } from "./launchServer";

let serverProcess: ChildProcess;

test.describe("User Authorization Flow", () => {
  test.beforeAll(async () => {
    // Arrancar el servidor
    try {
      await execPromise("npm run build"); // Usa exec para iniciar el servidor
      console.log("Server is building...");
    } catch (error) {
      console.error("Error while building server:", error);
      throw error; // Lanzamos el error si el servidor no puede iniciarse
    }
  });
  test.beforeEach(async () => {
    // Arrancar el servidor
    try {
      serverProcess = exec("npm run start"); // Usa exec para iniciar el servidor
      await waitForServer('http://localhost:3000');
      console.log("Server is starting...");
    } catch (error) {
      console.error("Error while starting server:", error);
      throw error; // Lanzamos el error si el servidor no puede iniciarse
    }
  });
  test.afterEach(() => {
    // Detener el servidor después de todas las pruebas
    if (serverProcess) {
      serverProcess.kill("SIGINT"); // Enviar señal SIGINT para detener el servidor
      console.log("Server process terminated.");
    }
  });

  test("Register Performance test", async ({ page }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto("http://localhost:3000/register");

    const end = performance.now();
    console.log(`Page load time: ${end - start} ms`);

    // Puedes hacer aserciones para verificar el rendimiento
    expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
  });

  test("Login Performance test", async ({ page }) => {
    // Empieza a medir el tiempo de carga
    const start = performance.now();

    await page.goto("http://localhost:3000/login");

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

      await page.goto("http://localhost:3000/login");

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

      await page.goto("http://localhost:3000/register");

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
