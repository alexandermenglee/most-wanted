'use strict'

/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let array = new Array();
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    mainMenu(foundPerson);
    break;
    case 'no':  
    searchByTrait(people);
    // TODO: search by traits
    break;
    default:
      app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person){
  let people = data;
  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    alert(getPersonInfo(person));
    break;
    case "family":
    // TODO: get person's family
    getFamily(person, people);
    break;
    case "descendants":
    // TODO: get person's descendants
    findDescendants(person, people);
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person); // ask again
  }
}


// find siblings
    // take current person's parent array and loop through it 
    // loop through dataset
      // loop through current elements parents array 
        // check if current element is equal to the current person object's current element
function getFamily(personObj, people) {
  let siblings = [];
  if(personObj.parents.length === 0) {
    alert("With our current data, we do not detect any immediate family");
  }
  
  for(let i = 0; i < personObj.parents.length; i++) {
    for(let j = 0; j < people.length; j++) {
        for(let k = 0; k < people[j].parents.length; k++) {
          if (personObj.parents[i] === people[j].parents[k] && !siblings.includes(people[j])) {
            siblings.push(people[j]);
          }
        }
    }
  }

  // removes personObj from the siblings array
  siblings.splice(siblings.indexOf(personObj), 1);

  return siblings;
}

function getPersonInfo(personObj) {
	return personObj
	  personObj	+= "ID: " + personObj.id + "\n";
	  personObj	+= "First Name: " + personObj.firstName + "\n";
	  personObj += "Last Name: " + personObj.lastName + "\n"; 
	  personObj += "Weight: " + personObj.weight + "\n";
	  personObj += "Height: " + personObj.height + "\n";
	  personObj += "Eyecolor: " + personObj.eyecolor + "\n"; 
	  personObj += "Occupation: " + personObj.occupation + "\n"; 
	  personObj += "DOB: " + personObj.dob + "\n"; 
	  personObj += "Gender: " + personObj.gender + "\n"; 
	  personObj += "Age: " + personObj.age(person.dob) + "\n"; 
 
}

// SEARCH BY NAME
function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase()
  let results = people.filter(el => {
    if(el.firstName.toLowerCase() === firstName && el.lastName.toLowerCase() === lastName) { 
      return true;
    }
  });

  return results[0]; 
}

// SEARCH BY TRAIT 
function searchByTrait(people) {
	let searchTrait = promptFor("Enter the trait that you would like to look for: 'height', 'weight', 'eye color', 'occupation', or 'gender'.\n Type the option you want or 'show list' or 'quit'", chars).toLowerCase().trim();
  let trait = "";
  let results = [];
    
		switch(searchTrait){
      case "height":
        searchTrait = "height";
        trait = promptFor("What is the person's height?", chars);
        results = findPerson(people, searchTrait, trait); // array
        if (results.length > 1) {
          alert(displayAllPeople(results));
          app(results);
        } else if(results.length === 0) {
          alert("There are no people with those parameters. Please try again.");
          app(people);
        } else if(results.length === 1) {
          mainMenu(results[0]);
        }
        break;
      case "weight":
        searchTrait = "weight"
        trait = promptFor("What is the person's weight", chars); 
        results = findPerson(people, searchTrait, trait);
        if (results.length > 1) {
          alert(displayAllPeople(results));
          app(results);
        } else if(results.length === 0) {
          alert("There are no people with those parameters. Please try again.");
          app(people);
        } else if(results.length === 1) {
          mainMenu(results[0]);
        }
        break;
      case "eyecolor":
      case "eye color":
      case "color":
        searchTrait = "eyeColor"
        trait = promptFor("What is the person's eye color?", chars);
        findPerson(people, searchTrait, trait);
        results = findPerson(people, searchTrait, trait);
        if (results.length > 1) {
          alert(displayAllPeople(results));
          app(results);
        } else if(results.length === 0) {
          alert("There are no people with those parameters. Please try again.");
          app(people);
        } else if(results.length === 1) {
          mainMenu(results[0]);
        }
        break;
      case "occupation":
      case "Job":
        searchTrait = "occupation"
        trait = promptFor("What is the person's occupation?", chars);
        results = findPerson(people, searchTrait, trait);
        if(results.length > 1) {
          alert(displayAllPeople(results));
          app(results);
        } else if(results.length === 0) {
          alert("There are no people with those parameters. Please try again.");
          app(people);
        } else if(results.length === 1) {
          // results is now an array with the found person
        }
        break;
      case "gender":
      case "Sex":
        searchTrait = "gender"
        trait = promptFor("What is the person's gender?", chars);
        results = findPerson(people, searchTrait, trait);
        if (results.length > 1) {
          alert(displayAllPeople(results));
          app(results);
        } else if(results.length === 0) {
          alert("There are no people with those parameters. Please try again.");
          app(people);
        } else if(results.length === 1) {
          return results;
        }
        break;
      case "quit":
        break;
      case "show list":
        console.log(people);
        break;
      default:
        searchByTrait(people);
    }

    // takes in the dataset array and the key value pair to be compared against
    // checks if the key value pair is a match in the dataset
    function findPerson(arr, traitKey, traitValue) {
      let results = [];
      for(let i = 0; i < arr.length; i++) {
        if(arr[i][traitKey] == traitValue) {
          results.push(arr[i]);
        }
      }
      return results;
    }
}

function displayAllPeople(peopleArray) {
  let listOfPeople = "";

  for(let i = 0; i < peopleArray.length; i++) {
    listOfPeople += `Name: ${peopleArray[i].firstName} ${peopleArray[i].lastName}
                     Gender: ${peopleArray[i].gender}
                     DOB: ${peopleArray[i].dob}
                     height: ${peopleArray[i].height}
                     weight: ${peopleArray[i].weight}
                     eye color: ${peopleArray[i].eyeColor}
                     occupation: ${peopleArray[i].occupation}
                     ======================================== \n`
  }

  return listOfPeople;
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function grabFullNames(people){
	let peopleToDisplay = people.map(function(person){
		return person.firstName + " " + person.lastName; 
	}).join(" & ");
	return peopleToDisplay; 
}

function grabFullNamesLineBreaks(people){
	let peopleToDisplay = people.map(function(person){
		return person.firstName + " " + person.lastName; 
	}).join("\n");
	return peopleToDisplay; 
}

// print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
function displayPerson(person){
  let personInfo = "First Name: " + person.firstName + "\n";
      personInfo += "Last Name: " + person.lastName + "\n";
      personInfo += "Weight: " + person.weight + "\n";
      personInfo += "Height: " + person.height + "\n";
      personInfo += "Eyecolor: " + person.eyecolor + "\n"; 
      personInfo += "Occupation: " + person.occupation + "\n";
      personInfo += "DOB: " + person.dob + "\n"; 
      personInfo += "Gender: " + person.gender + "\n"; 
    // personInfo += "Age: " + person.age(person.dob) + "\n"; 

  return personInfo;
}

// function that prompts and validates user input
function promptFor(question, valid){  // "valid" is a callback!
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}

function getAge(dob){
	let currentDay = new date(); 
	let brithDate = new Day(dob);
  let age = currentDate.getFullYear() - birthDate.getFullYear(); 
  
	if(currentDate < (new Date(brithDate.setFullYear()))) {
	  age = age - 1; 
  }

	return age; 
}

function findDescendants(person, data) {
  let children = [];
  let k = -1;

  (function findChildren(person) {
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].parents.length; j++) {
        if (person.id === data[i].parents[j]) {
          children.push(data[i]);
        }
      }
    }
    k++;
    while (k < children.length) {
      findChildren(children[k]);
    }
  })(person);

  return children;
}