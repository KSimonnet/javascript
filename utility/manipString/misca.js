// for naming classes
const toPascalCase = (str) =>
  str.replace(/\b\w/g, (match) => match.toUpperCase());

export { toPascalCase };

// for naming functions and methods
const toCamelCase = (str) =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, i) =>
      i === 0 ? word.toLowerCase() : word.toUpperCase(),
    )
    .replace(/\s+/g, "");

export { toCamelCase };

// for naming variables, properties, files; and with databases, table and column
const toSnakeCase = (str) => str.replace(/\s+/g, "_").toLowerCase();

export { toSnakeCase };

// for naming urls
const toKebabCase = (str) => str.replace(/\s+/g, "-").toLowerCase();

export { toKebabCase };
