const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db", "contacts.json");
console.log(contactsPath);

const updatecontacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const oneContact = contacts.find((c) => c.id === contactId);
  if (!oneContact) {
    return null;
  }
  return oneContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const i = contacts.findIndex((c) => c.id === contactId);
  if (i === -1) {
    return null;
  }
  const [removeContact] = contacts.splice(i, 1);
  await updatecontacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await updatecontacts(contacts);
  return newContact;
}

module.exports = { listContacts, getContactById, removeContact, addContact };
