import * as functions from 'firebase-functions'

import { db, mail as mailgun, settings } from '../../config'
import { MailService, Templates } from '../../services/mail'

export const SendInviteEmails = functions.https.onCall(async ({ emails }, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'You must be authenticated to use this function')
  }

  try {
    functions.logger.debug('sending invites started')

    const mail = new MailService(mailgun, settings.domain)

    const userData = await (await db.collection('users').doc(context.auth.uid).get()).data()

    await mail.send(Templates.Invite, { email: emails, inviterName: userData?.displayName })

    return { msg: 'ok' }
  } catch (err) {
    functions.logger.error('An error occurred while running user created', err)
  }
})