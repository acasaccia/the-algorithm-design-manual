"use strict";

var BST = require('../BinarySearchTree.js');

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

describe('Binary search tree by surname', function(){

    it('should not contain the value "Casaccia"', function(){
       expect(by_surname.search('Casaccia')).toBe(undefined);
    });

    it('should contain the value "Burke"', function(){
       expect(by_surname.search('Burke')).not.toBe(undefined);
    });

    it('should not contain the value "Burke" as minimum', function(){
       expect(by_surname.min().value.surname).toBe('Burke');
    });

    it('should contain the value "Watkins" as maximum', function(){
       expect(by_surname.max().value.surname).toBe('Watkins');
    });

    it('should return the value "Burke" for next("A")', function(){
        expect(by_surname.next('A').value.surname).toBe('Burke');
    });

    it('should return the value "Cobb" for next("C")', function(){
        expect(by_surname.next('C').value.surname).toBe('Cobb');
    });

    it('should return the value "Townsend" for next("T")', function(){
        expect(by_surname.next('T').value.surname).toBe('Townsend');
    });

    it('should return undefined for next("Z")', function(){
        expect(by_surname.next('Z')).toBe(undefined);
    });

    it('should return the value "Fuller" for prev("J")', function(){
        expect(by_surname.prev('J').value.surname).toBe('Fuller');
    });

    it('should return the value "Watkins" for prev("Z")', function(){
        expect(by_surname.prev('Z').value.surname).toBe('Watkins');
    });

    it('should return the value "Cobb" for prev("D")', function(){
        expect(by_surname.prev('D').value.surname).toBe('Cobb');
    });

    it('should return undefined for prev("A")', function(){
        expect(by_surname.prev('A')).toBe(undefined);
    });

    //it('should return "false" trying to delete a non existing value', function(){
    //    expect(by_surname.delete('Casaccia')).toBe(false);
    //});

    //it('should return "true" upon successful deletion', function(){
    //    expect(by_surname.delete('Burke')).toBe(true);
    //});

    //it('should not contain the value "Casaccia"', function(){
    //    expect(by_surname.search('Casaccia')).toBe(undefined);
    //});

    //it('should not contain the value "Burke" after deleting it', function(){
    //    expect(by_surname.search('Burke')).toBe(undefined);
    //});

});

describe('Binary search tree by birthday', function(){

    it('should not contain the birthday 19/04/1981', function(){
        expect(by_birthday.search(new Date("1981-04-19T13:10:02.000Z").getTime())).toBeUndefined();
    });

    it('should contain the birthday "19/04/1996"', function(){
        expect(by_birthday.search(new Date("1996-04-19T07:19:02.090Z").getTime())).not.toBeUndefined();
    });

    it('should contain the birthday 05/11/1953 as minimum value', function(){
        expect(new Date(by_birthday.min().value.birthday).getTime()).toBe(new Date("1953-11-05T03:43:51.849Z").getTime());
    });

    it('should contain the birthday "19/04/1996" as maximum value', function(){
        expect(new Date(by_birthday.max().value.birthday).getTime()).toBe(new Date("1996-04-19T07:19:02.090Z").getTime());
    });

});