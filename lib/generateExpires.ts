import { addMinutes } from "date-fns/addMinutes";

export function generateDateExpire() {
  const now = new Date();
  const minutes = addMinutes(now, 20);
  return minutes;
}
