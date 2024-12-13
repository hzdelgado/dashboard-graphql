import { test, expect } from "@playwright/test";
import getPort from "get-port";
import { ChildProcess, exec } from "child_process";
import { stopServer, waitForServer, fakeLogin } from "./launchServer";
const fakeUsers = [
  {
    id: "4",
    name: "Emily Carter",
    email: "emily.carter@example.com",
    profile: "ADMIN",
    active: true,
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael.brown@example.com",
    profile: "OPERATOR",
    active: false,
  },
  {
    id: "6",
    name: "Sophia Williams",
    email: "sophia.williams@example.com",
    profile: "OPERATOR",
    active: true,
  },
  {
    id: "7",
    name: "James Taylor",
    email: "james.taylor@example.com",
    profile: "ADMIN",
    active: false,
  },
  {
    id: "8",
    name: "Isabella Martinez",
    email: "isabella.martinez@example.com",
    profile: "OPERATOR",
    active: true,
  },
  {
    id: "9",
    name: "David Anderson",
    email: "david.anderson@example.com",
    profile: "OPERATOR",
    active: false,
  },
  {
    id: "10",
    name: "Olivia Thomas",
    email: "olivia.thomas@example.com",
    profile: "ADMIN",
    active: true,
  },
  {
    id: "11",
    name: "William Garcia",
    email: "william.garcia@example.com",
    profile: "OPERATOR",
    active: false,
  },
  {
    id: "12",
    name: "Evelyn Hernandez",
    email: "evelyn.hernandez@example.com",
    profile: "OPERATOR",
    active: true,
  },
  {
    id: "13",
    name: "Benjamin Moore",
    email: "benjamin.moore@example.com",
    profile: "OPERATOR",
    active: true,
  },
];

test.describe("User management Flow", async () => {
  let port: number;
  let process: ChildProcess;
  const mockUser = {
    token: "fakeToken",
    email: "test@example.com",
    userId: "123",
    userName: "Test User",
    profile: "ADMIN",
  };

  test.beforeEach(async ({ page, context }) => {
    port = await getPort(); // Encuentra un puerto disponible
    process = exec(`npm run start -- --port=${port}`);
    await waitForServer(`http://localhost:${port}`);
    // Intercepta solicitudes para simular datos

    await page.goto(`http://localhost:${port}`, {
      waitUntil: 'domcontentloaded', // Espera a que la página esté cargada
    });

    // Espera un poco más para asegurar que la página esté completamente lista antes de evaluar
    await page.waitForLoadState('load');

    // Ahora ejecuta fakeLogin después de que la página se haya cargado
    await page.evaluate((mockUser) => {
      localStorage.setItem("token", mockUser.token);
      localStorage.setItem("userId", mockUser.userId);
      localStorage.setItem("userName", mockUser.userName);
      localStorage.setItem("userProfile", mockUser.profile);
    }, mockUser);
   // Configura cookies manualmente usando el contexto
    await context.addCookies([
      {
        name: 'auth_token',
        value: mockUser.token,
        domain: 'localhost',
        path: '/',
        httpOnly: false,
        secure: false,
        sameSite: 'Strict',
      },
    ]);

    await page.route("**/graphql", async (route, request) => {
      if (request.postData()?.includes("query GetUsers")) {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              users: fakeUsers,
            },
          }),
        });
      } else if (request.postData()?.includes("mutation UpdateUser")) {
        route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            data: {
              updateUser: "Success",
            },
          }),
        });
      } else {
        route.continue();
      }
    });
    // Navega a la página de usuarios después de simular el inicio de sesión
    await page.goto(`http://localhost:${port}/dashboard/users`, { waitUntil: 'domcontentloaded' });

  });

  test.afterEach(async ({ page }) => {
    stopServer(process);
  });


  test('Should show the table users', async ({ page }) => {
    // Espera que la tabla se renderice
    const table = page.locator('table');
    await expect(table).toBeVisible();

    // Verifica las columnas de la tabla
    const columnHeaders = table.locator('thead th');
    await expect(columnHeaders).toHaveCount(5);

  });

  test('Should paginate correctly', async ({ page }) => {
    // Verifica que se muestren 2 filas por página
    const rows = page.locator('table tbody tr');
    // Imprimir el contenido HTML en la consola
    await expect(rows).toHaveCount(5);

    // Navega a la siguiente página
    const nextPageButton = page.locator('button:has-text("2")');
    await nextPageButton.click();

    // Verifica que se carguen nuevos datos
    const firstRowText = await rows.nth(0).locator('td').first().textContent();
    expect(firstRowText).not.toBeNull();
  });

  test('Should open side panel after clicking on the first row', async ({ page }) => {
    // Haz clic en la primera fila de la tabla
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.click();

    // Verifica que el panel lateral se abra
    const sidePanel = page.locator('[role="dialog"]');
    await expect(sidePanel).toBeVisible();

    // Verifica que los datos del usuario se carguen en el panel
    const nameField = sidePanel.locator('input[name="name"]');
    await expect(nameField).toHaveValue('Emily Carter');
  });

  test('Should allow to update an user', async ({ page }) => {
    // Abre el panel lateral
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.click();

    // Modifica un campo
    const profileSelect = page.locator('[role="dialog"] select[name="profile"]');
    await profileSelect.selectOption('OPERATOR');
    await expect(profileSelect).toHaveValue('OPERATOR');

    // Guarda los cambios
    const saveButton = page.locator('[role="dialog"] button:has-text("Guardar")');
    await expect(saveButton).not.toBeDisabled();
    await saveButton.click();

    const response = await page.waitForResponse("**/graphql", {
      timeout: 15000,
    }); // 15 segundos

    // Verifica que el panel lateral se cierre
    const sidePanel = page.locator('[role="dialog"]');
    await expect(sidePanel).not.toBeVisible();

    // Verifica que los cambios se reflejen en la tabla
    const updatedRow = page.locator('table tbody tr').first();
    await expect(updatedRow.locator('td').nth(3)).toHaveText('OPERATOR');
  });

  test('Should disable the save button if there are no new changes', async ({ page }) => {
    // Abre el panel lateral
    const firstRow = page.locator('table tbody tr').first();
    await firstRow.click();

    // Verifica que el botón Guardar esté deshabilitado
    const saveButton = page.locator('[role="dialog"] button:has-text("Guardar")');
    await expect(saveButton).toBeDisabled();
  });

  test('Should redirect to /login if role is not ADMIN', async ({ page }) => {
    await page.evaluate(() => {
      localStorage.setItem('userProfile', 'OPERATOR');
    });

    await page.reload({ waitUntil: 'networkidle' });
    // Espera que la URL cambie a la página de acceso denegado
    await page.waitForURL('**/dashboard/access-denied');
    // Verifica que la URL actual es la esperada
    const currentUrl = page.url();
    expect(currentUrl).toBe(`http://localhost:${port}/dashboard/access-denied`);
  });

});
