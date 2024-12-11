import { test, expect } from "@playwright/test";
import { fakeLogin, test as textExt } from "./e2e-setup";

test.describe("User management Flow", () => {
  /*test.beforeAll(async () => {
    // Arrancar el servidor
    try {
      await execPromise("npm run build"); // Usa exec para iniciar el servidor
      console.log("Server is building...");
    } catch (error) {
      console.error("Error while building server:", error);
      throw error; // Lanzamos el error si el servidor no puede iniciarse
    }
  });*/

  test.beforeEach(async ({ page }) => {
    // Intercepta solicitudes para simular datos
    await page.route("**/graphql", async (route, request) => {
        if (request.postData()?.includes("query getUsers")) {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    data: {
                        users: [
                          {
                            id: "1",
                            name: "John Doe",
                            email: "john.doe@example.com",
                            profile: "admin",
                            active: true,
                          },
                          {
                            id: "2",
                            name: "Jane Smith",
                            email: "jane.smith@example.com",
                            profile: "user",
                            active: false,
                          },
                        ],
                      },
                }),
            });
        }

        if (request.postData()?.includes("mutation UpdateUser")) {
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: "Success",
            });
        }
    });

    fakeLogin({
        token: "fakeToken",
        email: "test@example.com",
        userId: "123",
        userName: "Test User",
        profile: "admin",
    })

    // Navega a la página
  });

  textExt("Should show the table users", async ({ page, server }) => {

    await page.goto(`http://localhost:${server.port}/dashboard/users`);
    // Verifica que la tabla está presente y tiene datos
    const rows = page.locator("table tbody tr");
    await expect(rows).toHaveCount(2);
  });

  textExt("Should open the sidepanel after clicking on a row", async ({
    page, server
  }) => {
    await page.goto(`http://localhost:${server.port}/dashboard/users`);

    // Haz clic en la primera fila
    await page.locator("table tbody tr").first().click();

    // Verifica que el panel lateral esté visible
    const sidePanel = page.locator('[data-testid="side-panel"]');
    await expect(sidePanel).toBeVisible();
  });

  textExt("Should allow to save changes", async ({ page, server }) => {
    await page.goto(`http://localhost:${server.port}/dashboard/users`);
    // Abre el panel lateral
    await page.locator("table tbody tr").first().click();

    // Modifica un campo en el panel lateral
    const inputName = page.locator('[data-testid="input-name"]');
    await inputName.fill("John Updated");

    // Guarda los cambios
    const saveButton = page.locator('[data-testid="save-button"]');
    await saveButton.click();

    // Verifica que la solicitud fue exitosa y el panel se cierra
    const sidePanel = page.locator('[data-testid="side-panel"]');
    await expect(sidePanel).not.toBeVisible();
  });

});
