import * as Sentry from '@sentry/node'

import { initSentry } from '../config'

type FunctionType =
  | 'functions.https.onCall'
  | 'functions.pubsub.schedule.onRun'
  | 'functions.firestore.document.onUpdate'
  | 'functions.firestore.document.onCreate'
  | 'functions.database.ref.onWrite'
  | 'functions.database.ref.onDelete'

initSentry()

export const SentryWrapper = <T extends Array<any>>(name: string, type: FunctionType, handler: (...args: T) => any) => {
  return async (...args: T) => {
    const transaction = Sentry.startTransaction({
      name,
      op: type
    })

    Sentry.setContext('function context', {
      uid: (args[1] as any)?.auth?.uid,
      function: name,
      op: type
    })
    Sentry.setUser({
      id: (args[1] as any)?.auth?.uid
    })

    try {
      return await handler(...args)
    } catch (e) {
      Sentry.captureException(e)
      await Sentry.flush(1000)

      throw e
    } finally {
      Sentry.configureScope((scope) => scope.clear())
      transaction.finish()
    }
  }
}
