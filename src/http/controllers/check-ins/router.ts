import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/controllers/users/middlewares/verify-jwt'
import { history } from './history'
import { metrics } from './metrics'
import { create } from './create'
import { validate } from './validate'
import { verifyUserRole } from '../users/middlewares/verify-user-role'

export async function checkInsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJWT)

  app.get('/check-ins/history', history)
  app.get('/check-ins/metrics', metrics)
  app.patch(
    '/check-ins/:checkInId/validate',
    { onRequest: [verifyUserRole('ADMIN')] },
    validate,
  )

  app.post('/gyms/:gymId/check-ins', create)
}
