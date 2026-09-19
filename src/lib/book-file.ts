/**
 * The family's own copy of a book, kept on their own device.
 *
 * A textbook is somebody's property and cannot be shipped inside this
 * application. What a family already owns is a different matter: they choose
 * their PDF once, the browser renders it, and it is stored in IndexedDB on that
 * device. Nothing is uploaded, nothing reaches this server, and nothing about it
 * is in this repository — the file is theirs and it stays theirs.
 *
 * Kept per book id, so a student with several books picks each one once.
 */

const DB = "easy-school-books";
const STORE = "files";
const VERSION = 1;

type Stored = { blob: Blob; name: string; offset: number };

function open(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB, VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE)) request.result.createObjectStore(STORE);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function run<T>(mode: IDBTransactionMode, work: (store: IDBObjectStore) => IDBRequest<T>): Promise<T | undefined> {
  return open().then(
    (db) =>
      new Promise<T | undefined>((resolve, reject) => {
        const request = work(db.transaction(STORE, mode).objectStore(STORE));
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }),
  );
}

export async function loadBookFile(bookId: string): Promise<Stored | undefined> {
  try {
    return await run<Stored>("readonly", (store) => store.get(bookId) as IDBRequest<Stored>);
  } catch {
    return undefined; // private mode, blocked storage — the picker still works
  }
}

export async function saveBookFile(bookId: string, value: Stored): Promise<void> {
  try {
    await run("readwrite", (store) => store.put(value, bookId) as IDBRequest<IDBValidKey>);
  } catch {
    /* the book still opens for this visit */
  }
}

export async function forgetBookFile(bookId: string): Promise<void> {
  try {
    await run("readwrite", (store) => store.delete(bookId) as IDBRequest<undefined>);
  } catch {
    /* nothing to forget */
  }
}
