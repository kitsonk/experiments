"use strict";

var Pipe = require("heya-pipe/Pipe");
var array = require("heya-pipe/loopers/array");

var data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

// our test cases calculate a sum of squares of all odd digits

// test #1: compilation is out of the loop

var repeat1 = 1000000;

function test1_manual(){
    function f(data){
        var accumulator = 0;
        for(var i = 0, n = data.length; i < n; ++i){
            var value = data[i];
            if(value % 2){
                accumulator += value * value;
            }
        }
        return accumulator;
    }
    for(var i = 0; i < repeat1; ++i){
        f(data);
    }
}

function test1_pipe(){
    var f = array(new Pipe().
                filter("value % 2").
                map("value *= value;").
                fold("accumulator += value;", 0)
            ).compile();
    for(var i = 0; i < repeat1; ++i){
        f(data);
    }
}

function test1_extra(){
    for(var i = 0; i < repeat1; ++i){
        data.
            filter(function(value){ return value % 2; }).
            map(function(value){ return value * value; }).
            reduce(function(accumulator, value){ return accumulator + value; }, 0);
    }
}

function filter(value) {
    return value % 2;
}

function map(value) {
    return value * value;
}

function reduce(accumulator, value) {
    return accumulator + value;
}

function test1_noloopfn(){
    for(var i = 0; i < repeat1; ++i){
        data.filter(filter).map(map).reduce(reduce, 0);
    }
}

var t = new Date().getTime();
test1_manual();
t = new Date().getTime() - t;
console.log("test1_manual: " + t);

t = new Date().getTime();
test1_pipe();
t = new Date().getTime() - t;
console.log("test1_pipe: " + t);

t = new Date().getTime();
test1_extra();
t = new Date().getTime() - t;
console.log("test1_extra: " + t);

t = new Date().getTime();
test1_noloopfn();
t = new Date().getTime() - t;
console.log("test1_noloopfn: " + t);
