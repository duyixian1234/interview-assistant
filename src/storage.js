const STORAGE = "interview-contents";

export function init() {
  if (localStorage.getItem(STORAGE) == null) {
    localStorage.setItem(STORAGE, dumps({}));
  }
}

function dumps(obj) {
  return JSON.stringify(obj);
}

function loads(raw) {
  return JSON.parse(raw);
}
export function getContents() {
  init();
  return loads(localStorage.getItem(STORAGE));
}

export function setContent({ id, content }) {
  console.log("updating content for", id, content);
  const contents = getContents();
  contents[id] = content;
  localStorage.setItem(STORAGE, dumps(contents));
}

export function getContent({ id }) {
  return getContents()[id];
}

export function getIds() {
  return Object.keys(getContents());
}

export function removeContent({ id }) {
  const contents = getContents();
  delete contents[id];
  localStorage.setItem(STORAGE, dumps(contents));
}
