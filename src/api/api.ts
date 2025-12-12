export async function fetchNumber() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(123), 1000)
  })
}
