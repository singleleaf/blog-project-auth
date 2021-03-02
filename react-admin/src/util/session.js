function setSession(k, v) {
  let value = v
  if (v instanceof Object) {
    value = JSON.stringify(v)
  }
  window.sessionStorage.setItem(k, value)
}

function getSession(k) {
  let v = window.sessionStorage.getItem(k)
  let value = window.sessionStorage.getItem(k)
  try {
    value = JSON.parse(v)
  } catch (err) {
    value = window.sessionStorage.getItem(k)
  }
  v = value
  return v
}

function removeSession(k) {
  window.sessionStorage.removeItem(k)
}

function clearSession() {
  window.sessionStorage.clear()
}

export { setSession, getSession, removeSession, clearSession }
