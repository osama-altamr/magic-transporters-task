import { config } from '@app/config'
import { initializeMongoDB } from '@app/database/init'
import app from '@app/api/app'

/** Connects MongoDB, starts Express on config port. */
export const startServer = async (): Promise<void> => {
  await initializeMongoDB()

  const { port } = config.server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}
