//this is a single line comment

/*
this is a block comment
*/

//we have Numbers
1+1;

//Numbers in JavaScript are 
//"double-precision 64-bit format IEEE 754 values"
//Numbers in JavaScript are funny
0.1 + 0.2 == 0.30000000000000004;

//there are basic arithmetic operators
1-1;
2*2;
4/2;
6%3;

//and a built-in Math object for advanced 
//functions and constants
Math.PI;
Math.sin(3.5);

//You can convert a string to an integer
//using the built-in parseInt() function
//This takes the base for the 
//conversion as a second argument
parseInt("123", 10);
parseInt("11", 2);

//you can parse floating point numbers 
//using the built-in parseFloat() function
//which uses base 10 always
parseFloat("0.23");

//unary + operator to convert
+"42";

//NaN is not your friend.
parseInt("hello", 10);
NaN + 5;

//avoid it
isNaN(NaN);

//to infinity and beyond
1 / 0;
-1 / 0;

/**********NUMBERS************/

//we have strings
"hello";
"hello".length;
"hello".charAt(0);
"hello, world".replace("hello", "goodbye");
"hello".toUpperCase();

/**********Strings************/

//We have booleans
Boolean("");
Boolean(234);

var a;
var name = "simon";

var x = 0;
x += 5;
x = x + 5;

"hello" + " world";

"3" + 4 + 5;

3 + 4 + "5";

"dog" == "dog";

1 == true;

1 === true;

1 === "1";
1 == "1";

1 != "1";
1 !== "1";

var a;
a === undefined;
a === null;

typeof(a);
a = null;
typeof(a);

var name = "kittens";
if (name == "puppies") {
    name += "!";
} else if (name == "kittens") {
    name += "!!";
} else {
    name = "!" + name;
}
name == "kittens!!";

for (var i = 0; i < 5; i++) {
    i;
}

var i = 0;
while (i<5) {
    i++;
}

1 && 2+2;
0 && 2*2;

var obj = {};
obj.name = "Simon";
var name = obj.name;

obj["name"] = "Simon";
var name = obj["name"];

obj.for = "Simon"; // Syntax error, because 'for' is a reserved word
obj["for"] = "Simon"; // works fine

var obj = {
    name: "Carrot",
    "for": "Max",
    details: {
        color: "orange",
        size: 12
    }
}

obj.details.color;
obj["details"]["size"];

var a = ["dog", "cat", "hen"];
a.length;
a[100] = "fox";
a.length;

for (var i = 0; i < a.length; i++) {
    // Do something with a[i]
}

for (var i = 0, len = a.length; i < len; i++) {
    // Do something with a[i]
}

for (var i = 0, item; item = a[i++];) {
    // Do something with item
}

for (var i in a) {
  // Do something with a[i]
}


/**
a.toString()     
a.toLocaleString()   
a.concat(item[, itemN]) Returns a new array with the items added on to it.
a.join(sep)  
a.pop() Removes and returns the last item.
a.push(item[, itemN])   Push adds one or more items to the end.
a.reverse()  
a.shift()    
a.slice(start, end) Returns a sub-array.
a.sort([cmpfn]) Takes an optional comparison function.
a.splice(start, delcount[, itemN])  Lets you modify an array by deleting a section and replacing it with more items.
a.unshift([item])
*/

function add(x, y) {
    var total = x + y;
    return total;
}

add(2, 3, 4);

function add() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum;
}

add(2, 3, 4, 5);


function avg() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        sum += arguments[i];
    }
    return sum / arguments.length;
}

avg(2, 3, 4, 5);


function avgArray(arr) {
    var sum = 0;
    for (var i = 0, j = arr.length; i < j; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}

avg.apply(null, [2, 3, 4, 5]);


var a = 1;
var b = 2;
(function() {
    var b = 3;
    a += b;
})();

function makePerson(first, last) {
    return {
        first: first,
        last: last,
        fullName: function() {
            return this.first + ' ' + this.last;
        },
        fullNameReversed: function() {
            return this.last + ', ' + this.first;
        }
    }
}

s.fullName();
s.fullNameReversed();

function Person(first, last) {
    this.first = first;
    this.last = last;
    this.fullName = function() {
        return this.first + ' ' + this.last;
    }
    this.fullNameReversed = function() {
        return this.last + ', ' + this.first;
    }
}

var s = new Person("Simon", "Willison");

function Person(first, last) {
    this.first = first;
    this.last = last;
}
Person.prototype.fullName = function() {
    return this.first + ' ' + this.last;
}
Person.prototype.fullNameReversed = function() {
    return this.last + ', ' + this.first;
}

s = new Person("Simon", "Willison");
s.firstNameCaps();

Person.prototype.firstNameCaps = function() {
    return this.first.toUpperCase()
}

s.firstNameCaps();

String.prototype.reversed = function() {
    var r = "";
    for (var i = this.length - 1; i >= 0; i--) {
        r += this[i];
    }
    return r;
}

var s = "Simon";
s.reversed();

function trivialNew(constructor) {
    var o = {}; // Create an object
    constructor.apply(o, arguments);
    return o;
}

function lastNameCaps() {
    return this.last.toUpperCase();
}
var s = new Person("Simon", "Willison");
lastNameCaps.call(s);
// Is the same as:
s.lastNameCaps = lastNameCaps;
s.lastNameCaps();

function betterExampleNeeded() {
    var a = 1;
    function oneMoreThanA() {
        return a + 1;
    }
    return oneMoreThanA();
}

function makeAdder(a) {
    return function(b) {
        return a + b;
    }
}
x = makeAdder(5);
y = makeAdder(20);
x(6);

y(7);





























