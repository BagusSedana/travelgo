import * as fs from 'fs';
const content = `
const ADMIN_PIN = "travelgo2017";

export function verifyPin(pin: string): boolean {
  return pin === ADMIN_PIN;
}

export function isAdminLoggedIn(): boolean {
  return sessionStorage.getItem("travelgo_admin") === "true";
}

export function setAdminLoggedIn(v: boolean) {
  if (v) sessionStorage.setItem("travelgo_admin", "true");
  else sessionStorage.removeItem("travelgo_admin");
}
`;
fs.appendFileSync('src/app/components/store.ts', content);
