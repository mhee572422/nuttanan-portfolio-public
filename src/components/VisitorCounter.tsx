import { useState, useEffect } from 'react';
import { doc, onSnapshot, setDoc, updateDoc, increment, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const { language } = useLanguage();

  useEffect(() => {
    const docRef = doc(db, 'analytics', 'visitors');

    const recordVisit = async () => {
      // Check if this specific session has already been counted
      if (!sessionStorage.getItem('hasVisited')) {
        try {
          const docSnap = await getDoc(docRef);
          if (!docSnap.exists()) {
            await setDoc(docRef, { count: 1 });
          } else {
            await updateDoc(docRef, { count: increment(1) });
          }
          sessionStorage.setItem('hasVisited', 'true');
        } catch (error) {
          console.error("Error updating visitor count:", error);
        }
      }
    };

    recordVisit();

    // Subscribe to real-time updates
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().count);
      } else {
        setCount(0);
      }
    }, (error) => {
      console.error("Error fetching visitor count:", error);
    });

    return () => unsubscribe();
  }, []);

  if (count === null) return null;

  return (
    <div 
      className="flex items-center gap-2 text-foreground/40 text-[10px] uppercase tracking-[0.2em] mt-6 bg-foreground/5 px-4 py-2 rounded-full border border-foreground/10" 
      title={language === 'en' ? 'Total portfolio visitors' : 'จำนวนผู้เข้าชมพอร์ตโฟลิโอทั้งหมด'}
    >
      <Users size={14} className="text-primary" />
      <span>{count.toLocaleString()} {language === 'en' ? 'VISITORS' : 'ผู้เข้าชม'}</span>
    </div>
  );
}
