const contacts = require("./contacts");

const argv = require("yargs").argv;

// const { program } = require("commander");
// program
//   .option("-a, --action <type>", "choose action")
//   .option("-i, --contactId <type>", "user id")
//   .option("-n, --name <type>", "user name")
//   .option("-e, --email <type>", "user email")
//   .option("-p, --phone <type>", "user phone");

// program.parse(process.argv);

// const argv = program.opts();

async function invokeAction({ action, contactId, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await contacts.listContacts();
      console.log(allContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(contactId);
      console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;

    case "update":
      const updatedContact = await contacts.updateContact(
        contactId,
        name,
        email,
        phone
      );
      console.log(updatedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
