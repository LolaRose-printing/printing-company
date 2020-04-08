export function copyMap(state) {
  return { ...state };
}

export function deleteFromMap(copyMap, id) {
  copyMap[id] = undefined;
  return copyMap;
}

export function saveToMap(copyMap, toSave) {
  let object;

  if (!toSave.id) {
    object = { ...toSave };
    object.id = Math.max(...Object.keys(copyMap)) + 1;
  } else {
    object = toSave;
  }
  copyMap[object.id] = object;
  return copyMap;
}
