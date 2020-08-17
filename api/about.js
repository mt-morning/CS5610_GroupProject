let aboutMessage = 'Inventory Management Application';

function setAboutMessage(_, { message }) {
  aboutMessage = message;
  return aboutMessage;
}

function getMessage() {
  return aboutMessage;
}

module.exports = { getMessage, setAboutMessage };
