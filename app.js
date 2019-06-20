/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  findDescendants(people[17]);
  console.log(allDescendants);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
    // TODO: search by name
    var foundPerson = searchByName(people);
    break;
    case 'no':
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

  var displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

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
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);

  var foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  });
  // TODO: find the person using the name they entered
  return foundPerson;
}

function serachByTrait(people){
	var searchTrait = promptFor("Enter the trait that you would like to look for: 'height', 'weight', 'eye color', 'occupation', or 'gender'.\n Type the option you want or 'quit'", chars).toLowerCase();
		switch(searchTrait){
		case "height":
		searchTrait = "height";
		var trait = promptFor("What is the person's height?", chars); 
		break;
		case "weight":
		searchTrait = "weight"
		var trait = promptFor("What is the person's weight", chars); 
		break;
		case "eyecolor":
		case "eye color":
		case "color":
		searchTrait = "eyecolor"
		var trait = promptFor("What is the person's eye color?", chars);
		break;
		case "occupation":
		case "Job":
		searchTrait = "occupation"
		var trait = promptFor("What is the person's occupation?", chars); 
		break;
		case "gender":
		case "Sex":
		searchTrait = "gender"
		var trait = promptFor("What is the person's gender?", maleFemale); 
		break;
		case "quit":
			return; 
		default:
		return searchTrait(people);

		}
	var candidates = people.filter(function(people){
		if (traitValue === person[searchTrait]){
			return true;
		}
		else{
			return false;
		}
	});
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
				var foundPerson = searchByName(people); 
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
	}).join("&"):
	return peopleToDisplay; 
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
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
let allDescendants = [];
let parentsArray = [];

function findDescendants(person) {
  // If arr is empty, return
  if (person.parents.length === 0 && allDescendants.length === 0) {
    console.log("ORPHAN AF");
  } else if (person.parents.length === 0) {
      return allDescendants;
  }

  // Convert the elements from IDs to Objects
  // [{ person }, { person }]
  parentsArray = person.parents.map(el => findFromID(el));

  // Push each object into the allDescendants array
  // allDescendants = [{ person }, { person }]
  for (let i = 0; i < parentsArray.length; i++) {
    allDescendants.push(parentsArray[i]);
  }

  // For each person, run this same function on them
  parentsArray.forEach(val => findDescendants(val));
  // Return the allDescendants array
}

function findFromID(id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      return data[i];
    }
  }
}