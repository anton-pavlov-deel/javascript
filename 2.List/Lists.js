'use strict';

//--------------------------------------------------------------------------------LISTS

function List_node(value){
	this.value		= value;
	this.next		= undefined;
}

function List() {
	this.size = 0;
	this.begin = undefined;
	this.end = undefined;
	let it = this;

	this.add = function(value) {
		if (it.begin == undefined) {
			it.begin = new List_node(value);
			it.end = it.begin;
			it.size++;
		} else {
			let buffer = new List_node(value);
			it.end.next = buffer;
			it.end = buffer;
			it.size++;
		}
	}.bind(this)

	this.remove = function(index) {
		if (index < 0 || index >= it.size) {
			return undefined;
		} else if (size == 1){
			let buffer = it.begin;
			it = new List();
			return buffer;
		} else if (index == 0) {
			it.begin = it.begin.next;
			it.size --;
			return buffer;
		} else {
			let current = it.begin;
			while (index > 1) {
				current = current.next;
				index--;
			}
			let buffer = current.next;
			current.next = buffer.next;
			it.size--;
			return buffer;
		}
	}.bind(this)

	this.find = function(value) {
		let current = it.begin
		while (current != undefined) {
			if (current.value == value) {
				return current;
			}
			current = current.next;
		}
		return undefined;
	}.bind(this)
}

//--------------------------------------------------------------------------------LISTS

function numberToList(number) {
        if (typeof(number) != String) {
                number = new String(number);
        }

        let list = new List();
        let l = number.length;

        for (let i = 0; i <= l - 1; i++) {
                list.add(new Number(number[l - 1 - i]));
        }
        return list;
}

let list = numberToList(654321);

console.log(list.begin)
