import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { adminEmail, auth, db } from './firebase';

export function usePremiumStatus() {
  const [isPremium, setIsPremium] = useState(false);
  const firebaseAuth = auth;
  const firestore = db;

  useEffect(() => {
    if (!firebaseAuth || !firestore) {
      setIsPremium(false);
      return;
    }

    let stopEntitlement = () => {};
    const stopAuth = onAuthStateChanged(firebaseAuth, (user) => {
      stopEntitlement();
      setIsPremium(false);
      if (!user) return;

      void (async () => {
        const token = await user.getIdTokenResult(true);
        if (firebaseAuth.currentUser?.uid !== user.uid) return;
        const isAdmin = token.claims.admin === true || (user.email?.toLowerCase() === adminEmail && user.emailVerified);
        if (isAdmin) {
          setIsPremium(true);
          return;
        }
        stopEntitlement = onSnapshot(doc(firestore, 'users', user.uid), (snapshot) => {
          setIsPremium(snapshot.data()?.premium === true);
        }, () => setIsPremium(false));
      })().catch(() => setIsPremium(false));
    });

    return () => {
      stopAuth();
      stopEntitlement();
    };
  }, []);

  return isPremium;
}

