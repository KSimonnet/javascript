/**
 * in ES5
 */
const appDir = pt.dirname(require.main.filename);
const appDir = pt.resolve(__dirname + __filename);
console.log(process.argv[1]);

/**
 * in ES6 module, an equivalent to __dirname to identify the root directory of the current working directory (cwd)
 */
// https://stackoverflow.com/questions/76168024/how-can-i-produce-dirname-pointing-to-the-root-directory-from-within-an-ejs-mo
// https://blog.logrocket.com/alternatives-dirname-node-js-es-modules/
const __filename = url.fileURLToPath(import.meta.url);
const dirname = url.fileURLToPath(new URL(".", import.meta.url));
const __dirname = path.dirname(__filename);
console.log(dirname);
console.log(__dirname);
