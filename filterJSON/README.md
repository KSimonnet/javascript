# About

Gets all JSON files from a local directory > filters against a list of `key: value` pairs > copy matches to clipboard

# Instructions

**Install**

The codebase is modular: `main.js` calls functions from the folder `Utility` located at the root of the folder `NodeJS` (./NodeJS/Utility).

1. In your preferred CLI, navigate to your working directory by typing: `cd C:/USERS/USERNAME/PATH/TO/YOUR/DIRECTORY`
2. Create a folder by typing:

```
> mkdir YOUR_FOLDER_NAME
> cd YOUR_FOLDER_NAME
```

3. Download `filterJSON` and `Utility`and move them to the above folder
4. Check that `Utility` is one hierarchical level up from the master `main.js` to ensure the paths to Utiliy files remain valid
5. In `main.js` replace the variables `YOUR_KEY: "YOUR_VALUE"` and `"C:/USERS/USERNAME/PATH/TO/YOUR/DIRECTORY"` with your own

**Run**

1. In your preferred CLI, navigate to `filterJSON` by typing `cd ./filterJSON`
2. Open the aforementioned directory in VS Code by typing: `code .`
3. In the VS Code menu, under the tab "Terminal" select "New Terminal"
4. Run `main.js` by typing `node main.js` in the terminal

**Test**

1. In folder "testData", copy the content of `testData.js` and paste it into `main.js`
2. Run `main.js` (see above)
