import { setTokenInCookie } from '@/utils/cookies';
import { test as baseTest } from '@playwright/test';
import { exec } from 'child_process';
import getPort from 'get-port';
import { promisify } from 'util';

export const execPromise = promisify(exec);

export const test = baseTest.extend<{
  server: { port: number };
}>({
  server: async ({}, use) => {
    const port = await getPort(); // Encuentra un puerto disponible
    const serverProcess = exec(`npm run start -- --port=${port}`);
    if (!serverProcess.stdout) {
      throw new Error("No se puede capturar stdout del servidor.");
    }

    // Espera a que el servidor esté listo
    await new Promise<void>((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(
          new Error(
            `Timeout: El servidor no respondió en 15 segundos en el puerto ${port}`
          )
        );
      }, 15000); // Aumentamos el timeout a 15 segundos para servidores lentos

      serverProcess.stdout.on("data", (data) => {
        console.log(data.toString()); // Muestra el log del servidor en consola
        if (data.includes(`App running on port ${port}`)) {
          clearTimeout(timeout);
          resolve();
        }
      });

      serverProcess.stderr?.on("data", (data) => {
        console.error(`Error del servidor: ${data}`);
      });

      serverProcess.on("error", (err) => {
        clearTimeout(timeout);
        reject(err);
      });
    });

    await use({ port });

    // Cierra el servidor después de la prueba
    serverProcess.kill();
  },
});


export const fakeLogin = ({ token, userId, userName, profile }: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("userName", userName);
  localStorage.setItem("userProfile", profile);
  setTokenInCookie(token);
};
