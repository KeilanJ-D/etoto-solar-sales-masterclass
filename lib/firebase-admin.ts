import { initializeApp, getApps, cert, App } from 'firebase-admin/app'
import { getFirestore, Firestore } from 'firebase-admin/firestore'

let app: App | undefined
let db: Firestore | undefined

function getFirebaseAdmin() {
  if (!app) {
    const projectId = process.env.FIREBASE_PROJECT_ID
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error('Missing Firebase Admin credentials in environment variables')
    }

    if (getApps().length === 0) {
      app = initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      })
    } else {
      app = getApps()[0]
    }
  }

  if (!db) {
    db = getFirestore(app)
  }

  return { app, db }
}

export { getFirebaseAdmin }
