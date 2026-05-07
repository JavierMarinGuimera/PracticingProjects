export function parseEmail(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const email = value.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : null;
}

export function parsePassword(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  return value.length >= 8 ? value : null;
}
