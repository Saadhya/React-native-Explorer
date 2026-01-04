let isReady = false
const waiters: Array<() => void> = []

export const markDatabaseReady = () => {
  isReady = true
  waiters.splice(0, waiters.length).forEach((resolve) => resolve())
}

export const ensureDatabaseReady = async () => {
  if (isReady) return
  await new Promise<void>((resolve) => {
    waiters.push(resolve)
  })
}
