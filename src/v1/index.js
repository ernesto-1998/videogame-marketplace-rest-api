import 'dotenv/config'

import app from './app.js'
import { SERVER_PORT } from './keys/server-env.js'

// console.log(new Date().toISOString())

app.listen(SERVER_PORT, () => console.log(`Listening on PORT ${SERVER_PORT}`))
