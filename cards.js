/* Requirements

Create an HTML page that contains a text area and a button labeled Create.
When the user enters in text into the text area and then clicks the create button,
create a new card element in the DOM that includes it's own delete button.
You decide the height/width of the card.
When the user clicks the Delete button, the containing card, and no other cards,
should then be removed from the DOM. Not just made invisible, actually removed from the DOM.

Notes

In order to know which delete button the user clicked on, each one must have a unique value in
its id attribute. Remember your factory and generator functions. Generator should yield a unique
identifier. Factory should generate DOM string. You can't attach an event listener to an element
until it has been added to the DOM. */

const outputEl = document.getElementById("cardSection")
const createEl = document.getElementById("page")

// generator funtion to create a unique ID to apply to cards and their imbedded delete buttons
const uniqueID = function* () {
    let idNumber = 0;

    while (true) {
        yield idNumber;
        idNumber++;
    }
}

// instance of the generator function
const tagNumber = uniqueID();

// function to determine results of mouseclick
function executeMouseClick (event) {
    let whereClicked = event.target.id;
    let elemClicked = event.target.nodeName;
    
    // if the item clicked is a button
    if (elemClicked == "BUTTON") {

        // if the mouseclick occurs on the create button, then create a new card
        if (whereClicked == "create") {
            let cardText=document.getElementById("inputText").value
            let cardId = tagNumber.next().value

            outputEl.innerHTML += `
            <div id="card_${cardId}"><h4>Card ${cardId}</h4>
            <p>${cardText}</p>
            <button id="delete_${cardId}">Delete</button>
            </div>
            `
            
            // clear out the text input field
            document.getElementById("inputText").value=""
            document.getElementById("inputText").focus();

        // if the mouseclick occurs on a delete button, then delete the card related to that button
        } else if (whereClicked.startsWith("delete_")) {

            // grab the unique identifier off the ID of the delete button
            let pointer = whereClicked.split("_")[1]

            // find the card with the same identifier
            let remCard = document.getElementById('card_' + pointer );

            // get the parent node of the card with the correct id number and remove the child with correct ID
            remCard.parentNode.removeChild(remCard);
            document.getElementById("inputText").focus();

        // the button clicked must be the reset so reset the innerHTM of the entire card section    
        } else {
           
            outputEl.innerHTML = ``
            document.getElementById("inputText").focus();

        }

    // clicking anywhere not a button should put the focus in the input text field    
    } else {
        
        document.getElementById("inputText").focus();
        
    }
    
}

// add event listener on the whole body of the page then check where the mouse click occurs
createEl.addEventListener("click", executeMouseClick)