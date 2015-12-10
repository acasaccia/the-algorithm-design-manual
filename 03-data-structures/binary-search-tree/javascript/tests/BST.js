"use strict";

var BST = require('../BST.js');
var assert = require('assert');

var by_surname = new BST();
var by_birthday = new BST();

var data = [
    {
        "name": "Nora", "surname": "Tran", "birthday": "1953-11-05T03:43:51.849Z"
    },
    {
        "name": "Jared", "surname": "Cobb", "birthday": "1961-11-28T04:41:34.237Z"
    },
    {
        "name": "Olivia", "surname": "Owen", "birthday": "1994-10-09T09:11:47.483Z"
    },
    {
        "name": "Julia", "surname": "Burke", "birthday": "1996-04-19T07:19:02.090Z"
    },
    {
        "name": "Martin", "surname": "Fuller", "birthday": "1980-07-11T07:04:33.294Z"
    },
    {
        "name": "Jonathan", "surname": "Reynolds", "birthday": "1970-01-26T05:31:40.991Z"
    },
    {
        "name": "Lloyd", "surname": "Watkins", "birthday": "1958-10-07T04:16:48.048Z"
    },
    {
        "name": "Clayton", "surname": "Townsend", "birthday": "1985-10-12T07:05:05.757Z"
    },
    {
        "name": "Rhoda", "surname": "Freeman", "birthday": "1965-02-03T09:30:26.239Z"
    },
    {
        "name": "Gene", "surname": "Newton", "birthday": "1975-09-22T01:06:58.744Z"
    }
];

for (var i=0; i<data.length; i++) {
    by_surname.insert(data[i].surname, data[i]);
    by_birthday.insert(new Date(data[i].birthday).getTime(), data[i]);
}

assert(by_surname.search('Casaccia') === undefined, "Can't find surname \"Casaccia\"");
assert(by_surname.search('Burke') !== undefined, "Found surname \"Burke\"");

assert(by_birthday.search(new Date("1981-04-19T13:10:02.000Z").getTime()) === undefined, "Can't find birthday \"" + new Date("1981-04-19T13:10:02.000Z") + "\"");
assert(by_birthday.search(new Date("1996-04-19T07:19:02.090Z").getTime()) !== undefined, "Found birthday \"" + new Date("1996-04-19T07:19:02.090Z") + "\"");

assert(by_surname.min().value.surname === "Burke", "Min surname \"Burke\"");
assert(by_surname.max().value.surname === "Watkins", "Max surname \"Watkins\"");

assert(new Date(by_birthday.min().value.birthday).getTime() === new Date("1953-11-05T03:43:51.849Z").getTime(), "Min birthday \"" + new Date("1953-11-05T03:43:51.849Z") + "\"");
assert(new Date(by_birthday.max().value.birthday).getTime() === new Date("1996-04-19T07:19:02.090Z").getTime(), "Max birthday \"" + new Date("1996-04-19T07:19:02.090Z") +"\"");

assert(by_surname.next('A').value.surname === 'Burke');
assert(by_surname.next('C').value.surname === 'Cobb');
assert(by_surname.next('T').value.surname === 'Townsend');
assert(by_surname.next('Z') === undefined);

assert(by_surname.prev('J').value.surname === 'Fuller');
assert(by_surname.prev('Z').value.surname === 'Watkins');
assert(by_surname.prev('D').value.surname === 'Cobb');
assert(by_surname.prev('A') === undefined);

assert(by_surname.delete('Casaccia') === false);
assert(by_surname.delete('Burke') === true);

assert(by_surname.search('Casaccia') === undefined, "Can't find surname \"Casaccia\"");
assert(by_surname.search('Burke') === undefined, "Can't find surname \"Burke\" after deletion");
