/********************************************************************************
*  WEB700 – Assignment 02
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Matthaus Matthew  Student ID: 137314233  Date: 29/05/2025
********************************************************************************/

// Step 3 - Importing data from json files
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");

// Step 4 - Creating the legoData class
class legoData {
  constructor() {
    this.sets = [];
  }

  initialize() {
    return new Promise((resolve, reject) => {
      try {
        this.sets = [];
        setData.forEach(set => {
          const theme = themeData.find(theme => theme.id === set.theme_id);
          this.sets.push({
            ...set,
            theme: theme ? theme.name : "Unknown"
          });
        });
        resolve();
      } catch (err) {
        reject("Unable to load data: " + err);
      }
    });
  }

  getAllSets() {
    return new Promise((resolve, reject) => {
      if (this.sets.length > 0) {
        resolve(this.sets);
      } else {
        reject("No sets available.");
      }
    });
  }

  getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
      const foundSet = this.sets.find(set => set.set_num === setNum);
      if (foundSet) {
        resolve(foundSet);
      } else {
        reject("Unable to find requested set: " + setNum);
      }
    });
  }

  getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
      const results = this.sets.filter(set =>
        set.theme.toLowerCase().includes(theme.toLowerCase())
      );
      if (results.length > 0) {
        resolve(results);
      } else {
        reject("Unable to find requested sets for theme: " + theme);
      }
    });
  }
}

module.exports = legoData; // Exporting the legoData class

