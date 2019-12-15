export function deleteFromMap<T>(copyMap: Map<number, T>, orderId: number) {
  copyMap.delete(orderId);
  return copyMap;
}

export function saveToMap<T>(copyMap: Map<number, T>, toSave: T) {
  let object;

  if (!toSave.id) {
    object = { ...toSave };
    object.id = Math.max(...Array.from(copyMap.keys())) + 1;
  } else {
    object = toSave;
  }

  copyMap.set(object.id, object);
  return copyMap;
}
