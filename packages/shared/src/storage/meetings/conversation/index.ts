import { collection, doc, updateDoc, CollectionReference, DocumentData, arrayUnion } from 'firebase/firestore/lite'

import { firestore } from '../../firestore'

export type Message = {
  speaker: string
  language: string
  text: string
  timestamp: number
}

export type Conversation = Array<Message>

export class ConversationStore {
  private _db: CollectionReference<DocumentData>

  constructor() {
    this._db = collection(firestore, 'meetings')
  }

  public async add(mid: string, message: Message) {
    return updateDoc(doc(this._db, mid), { conversation: arrayUnion(message) })
  }
}
