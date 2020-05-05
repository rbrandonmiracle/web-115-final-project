// global variables and constants
// store html input form in variable for usage throughout application
let inputForm = document.getElementById("userInfo");

// declare variables to hold input fields, will be filled in the setFields() function
var     nameField,
        addressField,
        phoneField,
        emailField,
        personalInfoField,
        careerObjectiveField,
        educationalBackgroundField,
        employment1EntryField,
        employment1ExitField,
        employment1DetailsField,
        employment2EntryField,
        employment2ExitField,
        employment2DetailsField,
        employment3EntryField,
        employment3ExitField,
        employment3DetailsField,
        employment4EntryField,
        employment4ExitField,
        employment4DetailsField;

// declare empty list to hold mandatory fields, will be filled in the setFields() function
var mandatoryFields = [];

// constant list of month abbreviations for use when formatting date strings
const monthAbbreviations = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
]

// hard-coded text for character reference, business references
var characterReference = "Upon request"
var businessReferences =    "Dr. Kenneth Dettelbach, President,<br>" +
                            "Conference Centers of America, Centre One,<br>" + 
                            "35,000 Curtis Boulevard, Eastlake,<br>" +
                            "Ohio. 44094 / (216) 953-8000<br>" +
                            "<br>" +
                            "Mr. Terel J. Murphy, Executive Chef,<br>" +
                            "MacGregor Downs Country Club,<br>" +
                            "Cary, N.C. 27511  (919) 467-0146";

// helper functions
// set fields declared above by associating them with ElementById's
function setFields(){
    nameField = document.getElementById("fullName");
    addressField = document.getElementById("fullAddress");
    phoneField = document.getElementById("phoneNumber");
    emailField = document.getElementById("emailAddress");
    personalInfoField = document.getElementById("personalInfo");
    careerObjectiveField = document.getElementById("careerObjective");
    educationalBackgroundField = document.getElementById("educationalBackground");
    employment1EntryField = document.getElementById("employment1EntryDate");
    employment1ExitField = document.getElementById("employment1ExitDate");
    employment1DetailsField = document.getElementById("employment1Details");
    employment2EntryField = document.getElementById("employment2EntryDate");
    employment2ExitField = document.getElementById("employment2ExitDate");
    employment2DetailsField = document.getElementById("employment2Details");
    employment3EntryField = document.getElementById("employment3EntryDate");
    employment3ExitField = document.getElementById("employment3ExitDate");
    employment3DetailsField = document.getElementById("employment3Details");
    employment4EntryField = document.getElementById("employment4EntryDate");
    employment4ExitField = document.getElementById("employment4ExitDate");
    employment4DetailsField = document.getElementById("employment4Details");

    // fill mandatory fields list with all fields we want the user to be required to input
    mandatoryFields.push(nameField,
        addressField,
        phoneField,
        emailField,
        personalInfoField,
        careerObjectiveField,
        educationalBackgroundField,
        employment1EntryField,
        employment1DetailsField);
}

// write and style the header for the data input page.
// name, course info
function writeHeaders(){
    // determine where on page to write
    var myInfo = document.getElementById("myInfo");
    // console.log(myInfo);

    // store name and course info in variables
    var myName = "R. Brandon Miracle";
    var myCourse = "WEB 115, Section 0001";
    
    // h1 element for name, including required styling
    var nameHeader = document.createElement("h1");
    nameHeader.innerHTML = myName;
    nameHeader.style.fontFamily = "Tahoma, Geneva, Verdana, sans-serif";
    nameHeader.style.color = "red";
    nameHeader.style.textAlign = "center";
    
    // h2 element for course info, including required styling
    var courseHeader = document.createElement("h2");
    courseHeader.innerHTML = myCourse;
    courseHeader.style.fontFamily = "Garamond";
    courseHeader.style.color = "red";
    courseHeader.style.fontStyle = "italic";
    courseHeader.style.textAlign = "center";
    
    // append name and course info elements to page
    myInfo.append(nameHeader);
    myInfo.append(courseHeader);
}

// validate that email contains exactly one @ sign
// could be rewritten to use regular expressions
function validateEmail(){
    var inputEmail = document.getElementById("emailAddress").value;
    var containsOnlyOneAtSymbol = false;
    var atSymbolIndices = [];
    var errorMessage = "";

    // check each character of the email string for an @ symbol. if there is one, add it to an array of indices for @ symbols.
    for(var i=0; i<inputEmail.length; i++) {
        if (inputEmail[i] === "@") {
            atSymbolIndices.push(i);
        }
    }

    // check to see if there is exactly one @ symbol by checking array of indices
    if (atSymbolIndices.length === 1) {
        containsOnlyOneAtSymbol = true;
    }
    // else, if there's more than one, set an appropriate error message to explain problem and set bool to false
    else if (atSymbolIndices.length > 1) {
        containsOnlyOneAtSymbol = false;
        errorMessage = "Invalid Entry: E-mail may only contain one @ symbol.";
    }
    // else, if there are 0 @'s, set an appropriate error message to explain problem and set bool to false
    else if (atSymbolIndices.length === 0) {
        containsOnlyOneAtSymbol = false;
        errorMessage = "Invalid Entry: E-mail must contain an @ symbol.";
    }

    // if bool above is false, alert the user and tell them why their email was rejected
    if (!containsOnlyOneAtSymbol) {
        alert(errorMessage);
    }

    // return the bool that contains whether or not the email contains exactly one @
    return containsOnlyOneAtSymbol;
}

// check that phone number contains at least 6 characters
// not currently used in application, but could be if needed
function validatePhoneNumber(){
    var phoneNumber = phoneField.value.toString();
    var phoneNumberValid = true;
    if (phoneNumber.length <= 6){
        phoneNumberValid = false;
    }
    
    // return whether phone number is valid
    return phoneNumberValid;
}

// validate that data contains anything (not blank or "")
// major function used throughout rest of the application, be careful with any changes here
function validateDataExists(inputData){
    var dataExists = true;
    if (inputData === "") {
        dataExists = false;
    }
    // console.log(inputData);
    // console.log(dataExists);

    // return whether data exists
    return dataExists;
}

// parsing the output of date object into string, reformatting to Mon DD, YYYY
function parseDateData(dateObject){
    var dateString = dateObject.toString();
    var dateStringParts = dateString.split("-");
    var yearString = dateStringParts[0];
    var monthIndex = parseInt(dateStringParts[1]) - 1;
    var monthString = monthAbbreviations[monthIndex];
    var dayString = dateStringParts[2];
    dayString = dayString.replace(/^0+/, '');

    dateString = monthString + " " + dayString + ", " + yearString;

    // return single date's formatted string
    return dateString;
}

// taking a start date and end date, formatting into "<date> - <date" structure for use when writing to resume
// convert blank endDate to "Current"
// return the combined dateString
function formatEmploymentDates(startDate, endDate){
    var startDateString = parseDateData(startDate);
    var endDateString = "";
    var endDateExists = validateDataExists(endDate);

    if (endDateExists) {
        endDateString = parseDateData(endDate);
    }
    else {
        endDateString = "Current";
    }

    var dateString = startDateString + " - " + endDateString;
    // console.log(dateString);

    // return combined date string
    return dateString;
    
}

// validate that data exists in all required fields
// if a required field is not filled in, push an alert about required fields, set focus to first empty field, break execution
function validateMandatoryFields(){
    var allDataFieldsValid = true;
    var emptyField = null;

    for (i = 0; i < mandatoryFields.length; i++) {
        var field = mandatoryFields[i];
        console.log(field.value);
        var inputData = field.value;
        var dataExists = validateDataExists(inputData);
        // console.log(dataExists);
        if (!dataExists) {
            emptyField = mandatoryFields[i];
            allDataFieldsValid = false;
            alert("Please make sure you have provided information for all required fields.")
            console.log(emptyField);
            emptyField.focus();
            break;
        }
    }
    // console.log(allDataFieldsValid);

    // return whether all fields contained data
    return allDataFieldsValid;
}

// function to retrieve input data and store it in variables
// also store it in an object "resume", and return the object for easier and more flexible use elsewhere
function getUserData(){
    var fullName = nameField.value;
    var fullAddress = document.getElementById("fullAddress").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var emailAddress = document.getElementById("emailAddress").value;
    var personalInfo = document.getElementById("personalInfo").value;
    var careerObjective = document.getElementById("careerObjective").value;
    var educationalBackground = document.getElementById("educationalBackground").value;
    var employment1EntryDate = document.getElementById("employment1EntryDate").value;
    var employment1ExitDate = document.getElementById("employment1ExitDate").value;
    var employment1Details = document.getElementById("employment1Details").value;
    var employment2EntryDate = document.getElementById("employment2EntryDate").value;
    var employment2ExitDate = document.getElementById("employment2ExitDate").value;
    var employment2Details = document.getElementById("employment2Details").value;
    var employment3EntryDate = document.getElementById("employment3EntryDate").value;
    var employment3ExitDate = document.getElementById("employment3ExitDate").value;
    var employment3Details = document.getElementById("employment3Details").value;
    var employment4EntryDate = document.getElementById("employment4EntryDate").value;
    var employment4ExitDate = document.getElementById("employment4ExitDate").value;
    var employment4Details = document.getElementById("employment4Details").value;

    // resume object
    let resume = {
        name: fullName,
        address: fullAddress,
        phone: phoneNumber,
        email: emailAddress,
        personalInfo: personalInfo,
        careerObjective: careerObjective,
        education: educationalBackground,
        employment1StartDate: employment1EntryDate,
        employment1EndDate: employment1ExitDate,
        employment1Description: employment1Details,
        employment2StartDate: employment2EntryDate,
        employment2EndDate: employment2ExitDate,
        employment2Description: employment2Details,
        employment3StartDate: employment3EntryDate,
        employment3EndDate: employment3ExitDate,
        employment4Description: employment3Details,
        employment4StartDate: employment4EntryDate,
        employment4EndDate: employment4ExitDate,
        employment4Description: employment4Details,
    }

    // return the resume object
    return resume;
}

// function to handle the creation and writing of the resume page
function createResume() {
    // call the getUserData() function to retrieve and object with properties that store the userInput. store in a variable.
    resumeDetails = getUserData();

    // open a new window with dimension ratio just slightly wider than sheet of paper
    var resumePage = window.open('about:blank','My Resume','width=750,height=865,left=200,top=60');

    // check whether user entered start date && employment details for employment history #2 - #4 (optional entries)
    var employment2Exists = validateDataExists(resumeDetails.employment2StartDate) && validateDataExists(resumeDetails.employment2Details);
    var employment3Exists = validateDataExists(resumeDetails.employment3StartDate) && validateDataExists(resumeDetails.employment3Details);
    var employment4Exists = validateDataExists(resumeDetails.employment4StartDate) && validateDataExists(resumeDetails.employment4Details);

    // concatenate the resume header with name and contact info
    var resumeHeader = "<h1>" + resumeDetails.name + "</h1>";
    resumeHeader += "<p>" + resumeDetails.address + "  /  " + resumeDetails.phone + "  /  " + resumeDetails.email + "</p><hr>"

    // concatenate the resume body, starting with the longform "about me" type info
    // leftSide div will be floated left and clear both to maintain vertical formatting
    // rightSide div will **also be floated left**, in order to have the data justify to the left side, closer to the (leftSide) div directly before it
    var resumeBody = "<div class='leftSide subheader'>About Me</div>";
    resumeBody += "<div class='leftSide'>Personal Info</div><div class='rightSide'>" + resumeDetails.personalInfo + "</div><br>";
    resumeBody += "<div class='leftSide'>Career Objectives</div><div class='rightSide'>" + resumeDetails.careerObjective + "</div><br>";
    resumeBody += "<div class='leftSide'>Educational Background</div><div class='rightSide'>" + resumeDetails.education + "</div><br>";
    // continue concatenating resume body with employment experience data
    resumeBody += "<div class='leftSide subheader'>Employment Experience</div>";
    resumeBody +=   "<div class='leftSide'>" + formatEmploymentDates(resumeDetails.employment1StartDate, resumeDetails.employment1EndDate) +
                    "</div><div class='rightSide'>" + resumeDetails.employment1Description + "</div><br>";
    // only write employment #2 - #4 if user entered start date and details (validated above)
    if(employment2Exists){
        resumeBody +=   "<div class='leftSide'>" + formatEmploymentDates(resumeDetails.employment2StartDate, resumeDetails.employment2EndDate) +
                        "</div><div class='rightSide'>" + resumeDetails.employment2Description + "</div><br>";
    }
    if(employment3Exists){
        resumeBody +=   "<div class='leftSide'>" + formatEmploymentDates(resumeDetails.employment3StartDate, resumeDetails.employment3EndDate) +
                        "</div><div class='rightSide'>" + resumeDetails.employment3Description + "</div><br>";
    }
    if(employment4Exists){
        resumeBody +=   "<div class='leftSide'>" + formatEmploymentDates(resumeDetails.employment4StartDate, resumeDetails.employment4EndDate) +
                        "</div><div class='rightSide'>" + resumeDetails.employment4Description + "</div><br>";
    }
    // continue concatenating resume body with hard-coded references section
    resumeBody += "<div class='leftSide subheader'>References</div>";
    resumeBody += "<div class='leftSide'>Character References</div><div class='rightSide'>" + characterReference + "</div><br>";
    resumeBody += "<div class='leftSide'>Business References</div><div class='rightSide'>" + businessReferences + "</div><br>";

    // create the html header with link to resumeStyles.css style sheet, page title ("My Resume")
    var resumeText = "<html><head><link rel='stylesheet' href='resumeStyles.css'><title>My Resume</title></head>";

    // append the resume header (name/contact) and resume body within the <body> tag, close the html tag
    resumeText += "<body>" + resumeHeader + resumeBody + "</body></html>";

    // write the resume text to the new page
    resumePage.document.write(resumeText);
}

// mainline functions
// initialize the page - call the writeHeaders() and setFields() functions above
// called on input page's onload event
function initialize(){
    writeHeaders();
    setFields();
}

// process input. if email is valid, engage process of writing the resume page (other validation happens within)
function submitInput() {
    if (validateMandatoryFields()) {
    createResume();
    }
}