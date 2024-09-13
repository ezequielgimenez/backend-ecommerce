import gen from "random-seed";

export function generateCode() {
  const numRandom = new gen();
  const code = numRandom.intBetween(10000, 99999);
  return code;
}
