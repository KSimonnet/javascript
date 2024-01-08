var unqHsh = (a, o) =>
  a.filter((i) => (o.hasOwnProperty(i) ? false : (o[i] = true)));
export { unqHsh };

var categorizer = (obj_, q_key, n_key) => {
  let holder = [];
  title_categorization.forEach((tc) => {
    if (
      obj_[q_key] &&
      tc.x.some((xi) => xi.test(obj_[q_key])) &&
      (!tc.neg || tc.neg.every((xi) => !xi.test(obj_[q_key])))
    ) {
      holder.push(tc.cat);
    }
  });
  let out = {
    ...obj_,
    ...{ [n_key.replace(/y$/, "ies")]: unqHsh(holder, {}) },
  };
  return out;
};
export { categorizer };
