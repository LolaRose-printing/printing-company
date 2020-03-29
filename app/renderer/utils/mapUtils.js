export function copyMap(state) {
  const copyMap = new Map();
  state.forEach(e => copyMap.set(e.id, e));
  return copyMap;
}


export function deleteFromMap(copyMap, id) {
  copyMap.delete(id);
  return copyMap;
}

export function saveToMap(copyMap, toSave) {
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
