export const JustNowDate = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

export const JustDate = date => {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
};
