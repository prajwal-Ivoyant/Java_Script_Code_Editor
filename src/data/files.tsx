const files = {
    "index.js": {
        name: "index.js",
        language: "javascript",
        value: `console.log("Hello from index.js");`
    },

    "app.js": {
        name: "app.js",
        language: "javascript",
        value: `function add(a, b) {
  return a + b;
}

console.log(add(3, 4));`
    },

    "utils.js": {
        name: "utils.js",
        language: "javascript",
        value: `export function multiply(a, b) {
  return a * b;
}`
    },

    "style.css": {
        name: "style.css",
        language: "css",
        value: `body {
  background-color: #111827;
  color: #e5e7eb;
}`
    },

    "index.html": {
        name: "index.html",
        language: "html",
        value: `<!DOCTYPE html>
<html>
  <head>
    <title>Code Editor</title>
  </head>
  <body>
    <h1>Hello</h1>
  </body>
</html>`
    }
};

export default files;
