export function addToRefArray(el, refArray) {
  console.log("adding ref to array: ", el);
  if (!refArray.current.includes(el)) {
    refArray.current.push(el);
  } else {
    console.warn("Already in ref array");
  }
}