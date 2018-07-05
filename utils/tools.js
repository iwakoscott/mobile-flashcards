export function decouple(state) {
  return prop => {
    let copy = state;
    delete copy[prop];
    return copy;
  };
}
