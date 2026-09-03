// 'use client';

// import { EmailData } from '@/types/email-data-type';

// /**
//  * A custom hook that retrieves data from session storage by a given key.
//  *
//  * @template T - The type of the data to be stored.
//  * @param {string} key - The key under which the data is stored in session storage.
//  * @returns value - The stored data or null if not found.
//  */

// export function useGetSessionStorage(key: SessionKey): EmailData | null {
//   if (typeof window === 'undefined') {
//     return null;
//   }
//   // ex vacation data return from session storage
//   /**
//    * {
//    * afterHowManyYears: 0
//      childName: ""
//      currentCost: ""
//      currentInvestment: ""
//      existingInvestmentRate: 0
//      inflationRate: 0
//      name: ""
//      newInvestmentRate: 0
//      _savedAt: 1769099392478 // we want to remove this then return
//      }
//    */

//   const storedValue = sessionStorage.getItem(key);

//   return storedValue ? (JSON.parse(storedValue) as EmailData) : null;
// }

'use client';

import { EmailData } from '@/types/email-data-type';

type SessionValue<T> = T & { _savedAt?: number };

export function useGetSessionStorage<T extends EmailData = EmailData>(
  key?: SessionKey,
): T | null {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!key) {
    return null;
  }

  const storedValue =
    sessionStorage.getItem(key) ||
    sessionStorage.getItem(`react-hook-form-persist:${key}`);
  if (!storedValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(storedValue) as SessionValue<T>;

    if (parsed && typeof parsed === 'object' && '_savedAt' in parsed) {
      const { _savedAt, ...rest } = parsed;
      console.info('removed', { _savedAt });
      return rest as T;
    }

    return parsed as T;
  } catch (error) {
    console.warn('Failed to parse session storage value', { key, error });
    return null;
  }
}
