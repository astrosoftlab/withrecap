import { auth } from '../../config'
import { SentryWrapper } from '../../utils/sentry'
import * as functions from 'firebase-functions'

export const CreateAuthToken = functions.https.onCall(
  SentryWrapper('CreateAuthToken', 'functions.https.onCall', async (_, context) => {
    if (!context.auth) {
      throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to use this function')
    }

    functions.logger.debug('CreateAuthToken started')

    try {
      const token = await auth.createCustomToken(context.auth.uid)

      return { token }
    } catch (error) {
      throw new functions.https.HttpsError('internal', 'createCustomToken failed')
    }
  })
)
