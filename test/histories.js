import createHashHistory from 'history/lib/createHashHistory';

export function createHashHistoryWithoutKey() {
  // Avoid persistence of stored data from previous tests.
  window.sessionStorage.clear();

  return createHashHistory({ queryKey: false });
}
