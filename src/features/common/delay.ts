export async function delay(delayInMs: number) {
  await new Promise(r => setTimeout(r, delayInMs))
}
