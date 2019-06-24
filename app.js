'use strict'

/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  findDescendants(people[8]);
  
  console.log(children);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    foundPerson = searchByName(people);
    mainMenu(foundPerson, people); 
    break;
    case 'no':
    foundPerson = searchByTrait(people); 
    // TODO: search by traits
    break;
    default:
    app(people); // restart app
    break;
  }
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }
  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars).toLowerCase();
  var lastName = promptFor("What is the person's last name?", chars).toLowerCase();

  var foundPerson = people.filter(function(person){
    if(person.firstName.toLowerCase() === firstName && person.lastName === lastName.toLowerCase() === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0]; 
}

function seachByTrait(people){
	let searchTrait = promptFor("Enter the trait that you would like to look for: 'height', 'weight', 'eye color', 'occupation', or 'gender'.\n Type the option you want or 'quit'", chars).toLowerCase();
		let trait;
		switch(searchTrait){
		case "height":
		searchTrait = "height";
		trait = promptFor("What is the person's height?", chars); 
		break;
		case "weight":
		searchTrait = "weight"
		trait = promptFor("What is the person's weight", chars); 
		break;
		case "eyecolor":
		case "eye color":
		case "color":
		searchTrait = "eyecolor"
		trait = promptFor("What is the person's eye color?", chars);
		break;
		case "occupation":
		case "Job":
		searchTrait = "occupation"
		trait = promptFor("What is the person's occupation?", chars); 
		break;
		case "gender":
		case "Sex":
		searchTrait = "gender"
		trait = promptFor("What is the person's gender?", maleFemale); 
		break;
		case "quit":
			return; 
		default:
		return searchTrait(people);

		}
	let candidates = people.filter(function(people){
		if (traitValue === person[searchTrait]){
			return true;
		}
		else{
			return false;
		}
	})
	if (candidates.length == 1){
		let foundPerson = candidates[0];
		mainMenu(foundPerson, people); 
	}
		else if (candidates.length > 1){
			let keepGoing = promptFor("search returned" + candidates.length + "results.\n" + grabFullNamesLineBreaks(candidates) + "n\n\ Serach by another trait?\n Enter 'yes' to search again or 'no' to search by name", yesNo); 
			switch(keepGoing){
				case "yes":
					candidates = searchByTrait(candidates); 
					return candidates; 
					break; 
				case "no":
					let foundPerson = searchByName(people); 
					mainMenu(foundPerson, people);	
					break; 
			}
		}
		else{
			alert("Could not find candidate."); 
			return app(people); 
	}
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
  return peopleToDisplay;
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

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Eyecolor: " + person.eyecolor + "\n"; 
  personInfo += "Occupation: " + person.occupation + "\n"; 
  personInfo += "DOB: " + person.dob + "\n"; 
  personInfo += "Gender: " + person.gender + "\n"; 
  personInfo += "Age: " + person.age(person.dob) + "\n"; 
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
  //Completed the displayperson function!
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

function findParents(data) {
  // find all people with parents
  let test = data.filter(val => {
    if(val.parents.length > 0) {
      return true;
    }
  }); 
}


let allParents = [];
let parentsArray = [];

// finds the parents/grandparents
function findParents(person) {
  // checks if parents array is empty 
  if (person.parents.length === 0 && allParents.length === 0) {
    console.log("No descendants");
  } else if (person.parents.length === 0) {
    return allParents;
  }
  // takes the objects parents array and converts the ID to an object and saves it to a new array
  parentsArray = person.parents.map(el => findFromID(el));

  // loops through new array of objects and pushes it into allDescendants array
  for (let i = 0; i < parentsArray.length; i++) {
    allParents.push(parentsArray[i]);
  }
  // checks each element in the current person's parents array to see if they have any parents
  parentsArray.forEach(val => findDescendants(val));
}

function findFromID(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
}

// look at everyones parent array and check if it has the current id
// if yes, store it in a new array
// take the new array and call the same function for each element in the array


let children = [];
// set this variable to the found person first
let foundPersonId = 693243224;

function findDescendants(person) {
  for(let i = 0; i < data.length; i++) {
    if(data[i].parents.length !== 0) {
      for(let j = 0; j < data[i].parents.length; j++) {
        if(foundPersonId === data[i].parents[j]) {
          children.push(data[i]);
        }
      }
    }
  }

  // for(let k = 0; k < children.length; k++) {
  //   foundPersonId = children[k].id;
  //   // current issue: once we call the function; k gets reassigned to 0 making this an infinite loop
  //   findDescendants(children[k]);
  // }

  return children;
}