export const getInitials = fullName =>
  fullName
    .split(" ")
    .map(word => word[0])
    .join("");

export const randomSlice = (arr, len, size) => {
  if (len <= size) {
    return arr.slice(0, len);
  }
  const first = Math.floor(Math.random(len - size) * 10);
  return arr.slice(first, first + size);
};
