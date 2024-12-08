import { test, expect } from "@playwright/test";

test("LoginPage loads and allows login interaction", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  // Verifica que el logo se carga
  const logo = page.locator("img[alt='Logo']");
  await expect(logo).toBeVisible();

  // Interactúa con el formulario
  await page.fill("[data-testid='email']", "hillarizorrilla@gmail.com");
  await page.fill("[data-testid='password']", "89991421Aa@");
  await page.click("button[type='submit']");

  // Verifica el resultado esperado
  await expect(page).toHaveURL(/dashboard/);
});


test('Performance test', async ({ page }) => {
  // Empieza a medir el tiempo de carga
  const start = performance.now();
  
  await page.goto("http://localhost:3000/login");
  
  const end = performance.now();
  console.log(`Page load time: ${end - start} ms`);
  
  // Puedes hacer aserciones para verificar el rendimiento
  expect(end - start).toBeLessThan(3000); // El tiempo de carga debe ser menor a 3 segundos
});