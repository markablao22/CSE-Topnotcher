import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { adminEmail, auth, db } from './firebase';

export function usePremiumStatus() {
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!auth || !db) {
      setIsPremium(false);
      return;
    }

    let stopEntitlement = () => {};
    const stopAuth = onAuthStateChanged(auth, (user) => {
      stopEntitlement();
      setIsPremium(false);
      if (!user) return;

      void (async () => {
        const token = await user.getIdTokenResult(true);
        if (auth.currentUser?.uid !== user.uid) return;
        const isAdmin = token.claims.admin === true || (user.email?.toLowerCase() === adminEmail && user.emailVerified);
        if (isAdmin) {
          setIsPremium(true);
          return;
        }
        stopEntitlement = onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
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
