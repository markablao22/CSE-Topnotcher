import React, { useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, reload, sendEmailVerification, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, doc, where } from 'firebase/firestore';
import { Check, Crown, LogOut, ShieldCheck } from 'lucide-react';
import { adminEmail, auth, db, firebaseConfigured } from '../lib/firebase';

type Payment = { id: string; uid: string; email: string; reference: string; status: 'pending' | 'approved' | 'rejected'; createdAt?: { toDate?: () => Date } };

export const PremiumAccess: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [myPayments, setMyPayments] = useState<Payment[]>([]);
  const [hasPremium, setHasPremium] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [reference, setReference] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!db || !user || isAdmin) return;
    return onSnapshot(query(collection(db, 'paymentRequests'), where('uid', '==', user.uid)), (snap) => {
      const requests = snap.docs.map((item) => ({ id: item.id, ...item.data() } as Payment));
      setMyPayments(requests);
    }, (error) => setMessage(error.message));
  }, [user, isAdmin]);

  useEffect(() => {
    if (!db || !user || isAdmin) return;
    return onSnapshot(doc(db, 'users', user.uid), (snapshot) => {
      setHasPremium(snapshot.data()?.premium === true);
    }, (error) => setMessage(error.message));
  }, [user, isAdmin]);

  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, async (next) => {
      setUser(next);
      if (next) {
        const token = await next.getIdTokenResult(true);
        setIsAdmin(token.claims.admin === true || (next.email?.toLowerCase() === adminEmail && next.emailVerified));
      } else setIsAdmin(false);
    });
  }, []);

  useEffect(() => {
    if (!db || !isAdmin) return;
    return onSnapshot(query(collection(db, 'paymentRequests'), orderBy('createdAt', 'desc')), (snap) => {
      setPayments(snap.docs.map((item) => ({ id: item.id, ...item.data() } as Payment)));
    }, (error) => setMessage(error.message));
  }, [isAdmin]);

  const authenticate = async (register: boolean) => {
    if (!auth) return;
    setBusy(true);
    try {
      if (register) {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        await sendEmailVerification(credential.user);
        setMessage('Nagpadala kami ng verification link sa email mo. Buksan ito bago magsumite ng payment request.');
      } else {
        const credential = await signInWithEmailAndPassword(auth, email.trim(), password);
        setMessage(credential.user.emailVerified ? 'Naka-sign in na.' : 'Kumpirmahin muna ang email mo bago magsumite ng payment request.');
      }
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Hindi nakapag-sign in.'); }
    finally { setBusy(false); }
  };

  const refreshEmailVerification = async () => {
    if (!user || !auth) return;
    setBusy(true);
    try {
      await reload(user);
      const refreshedUser = auth.currentUser;
      if (!refreshedUser) return;
      setUser(refreshedUser);
      const token = await refreshedUser.getIdTokenResult(true);
      setIsAdmin(token.claims.admin === true || (refreshedUser.email?.toLowerCase() === adminEmail && refreshedUser.emailVerified));
      setMessage(refreshedUser.emailVerified ? 'Verified na ang email mo.' : 'Hindi pa verified ang email. Buksan muna ang verification link sa inbox mo.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Hindi ma-refresh ang email status.'); }
    finally { setBusy(false); }
  };

  const resendVerificationEmail = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await sendEmailVerification(user);
      setMessage('Nagpadala ulit kami ng verification link. Tingnan din ang Spam folder.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Hindi naipadala ang verification email.'); }
    finally { setBusy(false); }
  };

  const submitPayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !db || !reference.trim()) return;
    setBusy(true);
    try {
      await addDoc(collection(db, 'paymentRequests'), { uid: user.uid, email: user.email, amount: 250, reference: reference.trim(), status: 'pending', createdAt: serverTimestamp() });
      setMessage('Naipadala ang request. I-a-activate ang Premium matapos ma-review ng admin.');
      setReference('');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Hindi naipadala ang payment request.'); }
    finally { setBusy(false); }
  };

  const reviewPayment = async (payment: Payment, status: 'approved' | 'rejected') => {
    if (!db) return;
    try {
      await updateDoc(doc(db, 'paymentRequests', payment.id), { status, reviewedAt: serverTimestamp(), reviewedBy: user?.uid });
      if (status === 'approved') await setDoc(doc(db, 'users', payment.uid), { premium: true, premiumGrantedAt: serverTimestamp() }, { merge: true });
      setMessage(`Payment ${status}.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Hindi na-update ang request.'); }
  };

  return <div className="fixed inset-0 z-[70] overflow-y-auto bg-slate-950/60 p-4" role="dialog" aria-modal="true" aria-labelledby="premium-title">
    <div className="mx-auto my-8 max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4"><div><p className="text-sm font-semibold uppercase tracking-widest text-amber-600">CSE Topnotcher</p><h2 id="premium-title" className="mt-1 text-2xl font-bold">Premium · ₱250 one-time</h2></div><button onClick={onClose} className="rounded-lg px-3 py-1 text-slate-500 hover:bg-slate-100" aria-label="Isara">✕</button></div>
      {!firebaseConfigured ? <div className="mt-6 rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950">Kailangan munang ilagay ang Firebase web app settings sa <code>.env.local</code> para magamit ang login at payment review.</div> : <>
        {!user ? <div className="mt-5 space-y-3"><p className="text-sm text-slate-600 dark:text-slate-300">Gumawa ng account o mag-sign in para magsumite at makita ang payment status mo.</p><input className="w-full rounded-lg border p-3 dark:bg-slate-800" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /><input className="w-full rounded-lg border p-3 dark:bg-slate-800" type="password" placeholder="Password (8+ characters)" value={password} onChange={e=>setPassword(e.target.value)} /><div className="flex gap-2"><button disabled={busy} onClick={()=>authenticate(false)} className="rounded-lg bg-slate-900 px-4 py-2 font-semibold text-white">Mag-sign in</button><button disabled={busy} onClick={()=>authenticate(true)} className="rounded-lg border px-4 py-2 font-semibold">Gumawa ng account</button></div></div> : <div className="mt-5 space-y-5">
          <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800"><span className="text-sm">{user.email}</span><button onClick={()=>signOut(auth!)} className="flex items-center gap-1 text-sm text-slate-500"><LogOut size={15}/> Mag-sign out</button></div>
          {!user.emailVerified && <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"><p className="font-bold">I-verify muna ang email</p><p className="mt-1">Kailangan ang verified email bago makapagbayad o mag-admin review. Tingnan ang inbox at Spam folder para sa Firebase verification link.</p><div className="mt-3 flex flex-wrap gap-2"><button disabled={busy} onClick={resendVerificationEmail} className="rounded-lg border border-amber-700/30 px-3 py-2 font-semibold">Ipadala ulit ang link</button><button disabled={busy} onClick={refreshEmailVerification} className="rounded-lg bg-amber-500 px-3 py-2 font-bold text-slate-950">Na-verify ko na</button></div></div>}
          {isAdmin ? <section><h3 className="flex items-center gap-2 font-bold"><ShieldCheck size={18}/> Admin payment review</h3><div className="mt-3 space-y-3">{payments.filter(p=>p.status==='pending').map(p=><div key={p.id} className="rounded-xl border p-4"><p className="font-semibold">{p.email} · ₱250</p><p className="text-sm text-slate-500">GCash reference: {p.reference}</p><p className="mt-1 text-xs text-slate-500">Ihambing ang reference sa GCash transaction history bago aprubahan.</p><div className="mt-3 flex gap-2"><button onClick={()=>reviewPayment(p,'approved')} className="rounded-lg bg-emerald-600 px-3 py-2 text-sm font-bold text-white">Aprubahan</button><button onClick={()=>reviewPayment(p,'rejected')} className="rounded-lg border px-3 py-2 text-sm">Tanggihan</button></div></div>)}{payments.filter(p=>p.status==='pending').length===0&&<p className="text-sm text-slate-500">Walang pending payment.</p>}</div></section> : <>
            {hasPremium && <div className="rounded-lg bg-emerald-50 p-3 font-semibold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">Premium access approved na sa account na ito.</div>}
            {!hasPremium && myPayments.map((p)=><div key={p.id} className="rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">Payment request status: <strong className="capitalize">{p.status}</strong>{p.status==='rejected'&&' — Maaari kang magsumite muli ng bagong request.'}</div>)}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 dark:bg-amber-950/30 dark:text-amber-100"><p className="flex items-center gap-2 font-bold"><Crown size={18}/> Kasama sa Premium</p><ul className="mt-2 space-y-1"><li>• Unlimited practice questions</li><li>• Full simulated Civil Service exams</li><li>• Detailed answer explanations</li><li>• Performance tracking at wrong-answer review</li><li>• Walang advertisements</li></ul><p className="mt-3 font-bold">Bayad: ₱250 one-time · GCash</p><p className="mt-1">{import.meta.env.VITE_GCASH_ACCOUNT_NAME || 'GCash account name not configured'} · {import.meta.env.VITE_GCASH_NUMBER || 'GCash number not configured'}</p></div>
            {!hasPremium && user.emailVerified && <form onSubmit={submitPayment} className="space-y-3"><label className="block text-sm font-medium">GCash reference number<input required maxLength={80} className="mt-1 w-full rounded-lg border p-3 dark:bg-slate-800" value={reference} onChange={e=>setReference(e.target.value)} /></label><p className="text-xs text-slate-500">Itago ang GCash receipt at reference number para maikumpara sa transaction history. Huwag magpadala ng PIN o OTP.</p><button disabled={busy||!reference.trim()} className="rounded-lg bg-amber-500 px-4 py-3 font-bold text-slate-950 disabled:opacity-50">{busy?'Ipinapadala…':'Isumite para ma-review'}</button></form>}
          </>}
        </div>}
      </>}
      {message && <p role="status" className="mt-4 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-800">{message}</p>}
      <div className="mt-5 flex items-center gap-2 border-t pt-4 text-xs text-slate-500"><Check size={14}/> Manual na ibe-verify ang bawat bayad bago ibigay ang Premium access.</div>
    </div>
  </div>;
};
