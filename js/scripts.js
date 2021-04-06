// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] != undefined) {
    return this.contacts[id];
  }
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
}

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, address) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  this.email = email;
  this.address = address;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// Business Logic for Addresses ---------
function Address(address, type, category) {
  this.address = address;
  this.type = type;
  this.category = category;
}



// User Interface Logic ---------
let addressBook = new AddressBook();

function showContact(contactId) {
  const contact = addressBook.findContact(contactId);
  $("#show-contact").show();
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id); 
  });
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};

function displayContactDetails(addressBookToDisplay) {
  let contactsList = $("ul#contacts");
  let htmlForContactInfo = "";
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const contactEmail = contact.email;
    const contactAddress = contact.address;
    htmlForContactInfo += "<li class=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
    htmlForContactInfo += "<li class=" + contact.id + ">" + "Email Address: " + contactEmail.email + " (" + contactEmail.category + ")</li>";
    htmlForContactInfo += "<li class=" + contact.id + ">" + "Address: " + contactAddress.address + " (" + contactAddress.category + ")</li>";
  });
  contactsList.html(htmlForContactInfo);
};

$(document).ready(function() {
  attachContactListeners();
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $("input#new-first-name").val();
    const inputtedLastName = $("input#new-last-name").val();
    const inputtedPhoneNumber = $("input#new-phone-number").val();
    const inputtedEmail = $("input#new-email").val();
    const inputtedEmailCategory = $("input#email-category").val();
    const inputtedAddress = $("input#new-address").val();
    const inputtedAddressCategory = $("input#address-category").val();

    const emailObject = new Address(inputtedEmail, "email", inputtedEmailCategory);
    const addressObject = new Address(inputtedAddress, "physical", inputtedAddressCategory);

    $("input#new-first-name").val("");
    $("input#new-last-name").val("");
    $("input#new-phone-number").val("");
    $("input#new-email").val("");
    $("input#new-address").val("");
    $("input#EmailCategory").val("");
    $("input#AddressCategory").val("");

    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, emailObject, addressObject);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  });
});