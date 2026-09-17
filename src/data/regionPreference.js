export const REGION_STORAGE_KEY = 'teacher-nicole-region';
export const selectableRegions = ['malaysia', 'singapore', 'australia'];

export const isSelectableRegion = (region) => selectableRegions.includes(region);

export const readSavedRegion = (storage = typeof window !== 'undefined' ? window.localStorage : null) => {
  try {
    const saved = storage?.getItem(REGION_STORAGE_KEY);
    return isSelectableRegion(saved) ? saved : null;
  } catch {
    return null;
  }
};

export const saveRegion = (region, storage = typeof window !== 'undefined' ? window.localStorage : null) => {
  if (!isSelectableRegion(region)) return false;
  try {
    storage?.setItem(REGION_STORAGE_KEY, region);
    return true;
  } catch {
    return false;
  }
};
