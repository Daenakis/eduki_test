export function nameCrop(name) {
  if (name.length > 50) {
    const half = Math.floor(50 / 2);
    const start = name.substring(0, half);
    const end = name.substring(name.length - half);
    return start + "..." + end;
  } else {
    return name;
  }
}
