import { setTokenInCookie } from "@/utils/cookies";
import { ChildProcess, exec } from "child_process";
import { promisify } from "util";
// Promisificar exec para usar async/await
export const execPromise = promisify(exec);
// Función para esperar que el servidor esté listo
export const waitForServer = async (url: string, timeout: number = 10000) => {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await execPromise(`curl -s --head --request GET ${url}`);
      console.log(`Server ${url} is ready`);
      return;
    } catch (error) {
      console.log("Waiting for server...");
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Esperar 5 segundos antes de reintentar
    }
  }
  throw new Error(`Timeout waiting for server ${url}`);
};

export const stopServer = (serverProcess: ChildProcess) => {
  serverProcess.kill("SIGINT"); // Enviar una señal de terminación al proceso
};

export const fakeLogin = ({ token, userId, userName, profile }: any) => {
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  localStorage.setItem("userName", userName);
  localStorage.setItem("userProfile", profile);
  setTokenInCookie(token);
};
