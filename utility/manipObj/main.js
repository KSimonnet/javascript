const title_categorization = [
  {
    cat: "c level",
    x: [
      /\bc(\.|)\c{0,2}e(\.|)\s{0,2}o\b|\bch[ie]+f\W+commercial\W+(officer|ofc)/i,
      /\bc(\.|)\s{0,2}e(\.|)\s{0,2}o\b|\bch[ie]+f\W+exec(utive|)\W+(officer|ofc)/i,
      /\bfinanzleiter\b|(\bc(\.|)\s{0,2}f(\.|)\s{0,2}o\b|\bch[ie]+f.{1,26}fin(ance|ancial|).{1,26}(officer|ofc))/i,
      /\bc(\.|)\s{0,2}t(\.|)\s{0,2}o\b|\bch[ie]+f.{1,26}tech(nology|).{1,26}(officer|ofc)/i,
      /\bc(\.|)\s{0,2}o(\.|)\s{0,2}o\b|\bch[ie]+f\W+(op(s|eration(s|)))\W+(officer|ofc)/i,
      /\bc(\.|)\s{0,2}i(\.|)\s{0,2}o\b|\bch[ie]+f\W+(info(rmation|))\W+(officer|ofc)/i,
      /\bc(\.|)h(\.|)r(\.|)o\b|\bch[ie]+f\W+(hr|human\W+resource(s|))\W+(officer|ofc)/i,
      /(?<!sales.+?)(\bc(\.|)\s{0,2}s(\.|)\s{0,2}o\b|\bch[ie]+f\W+sec(urity|)\W+(officer|ofc))(?!.+?sales)/i,
      /\bch[ie]+f.{0,26}(sales|bus(iness|)\W+dev(elopment|)).{0,26}(officer|ofc)/i,
      /\bc(\.|)i(\.|)s(\.|)o\b|\bch[ie]+f\W+info((rmation|)(.{1,26}|)sec(urity|)).{1,26}(officer|ofc)/i,
      /\bc(\.|)\s{0,2}p(\.|)\s{0,2}o\b|\bch[ie]+f\W+people\W+(officer|ofc)/i,
    ],
    neg: [/Asistente del|assistant to|exe(c|cutive).{0,6}assistant|\bea\b/i],
  },
];

// the input
const arr_match = categorizer(
  { job_title: "CEO" },
  "job_title",
  "title_category"
);
console.log(arr_match);
// output
// {
// job_title:'CEO',
// job_categories: ['c level']
// }
