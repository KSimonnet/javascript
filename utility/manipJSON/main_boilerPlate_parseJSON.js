// const fs = require("fs");
import * as fs from "fs";
// import fs from "fs";
import path from "path";

var myFilePath_str =
  "J:/My Drive/exekSourcingData/scraped_content/listOfCpies/DB_listOfCpies_sales/listCpies_sales_kwame_37.json";

// async/await version
// https://stackoverflow.com/questions/18112204/get-all-directories-within-directory-nodejs
const getDirectories = async (dir) => {
  let fileNames_arr = [];
  (await fs.promises.readdir(dir, { withFileTypes: true }))
    .filter((dirent) => dirent.isFile())
    .map((dirent) => fileNames_arr.push(dirent.name))
    .catch((err) => console.error("Failed to read directory", err.message));
  return fileNames_arr;
};

async function getContents(filePath_str) {
  try {
    return await fs.promises.readFile(filePath_str); //path.resolve(filePath_str));
  } catch (err) {
    console.error("Failed to read file", err.message);
  }
}

// Callback version
/*   fs.readFile(filePath_str, "utf8", (err, data) => {
    if (err) throw err;
    var obj = JSON.parse(data.toString());
    console.log(obj);
  });

// Promise version
// https://subscription.packtpub.com/book/web-development/9781789539660/1/ch01lvl1sec12/asynchronous-programming-with-node-js
/* const readFile = (filePath_str) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath_str, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

readFile(myFilePath_str)
  .then((data) => JSON.parse(data.toString()))
  .then((JSONobj) => console.log(JSONobj))
  .catch((err) => console.error("err: ", err.message)); */

async function asynCall(filePath_str) {
  const fsPromises = fs.promises;
  const data = await fsPromises
    .readFile(filePath_str)
    .catch((err) => console.error("Failed to read file", err));
  return data;
}
const JSONobj = asynCall(path.resolve(myFilePath_str))
  .then((data) => {
    return JSON.parse(data.toString());
  })
  .catch((err) => console.error("asynCall() failed", err));
const cpyObj = await JSONobj;
