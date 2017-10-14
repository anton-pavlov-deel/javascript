'use strict';

//--------------------------------------------------------------------------------LISTS

function List_node(value){
	this.value		= value;
	this.next_node		= undefined;
}

function List_iterator(begin){
	this.current		= begin;
	this.next = function() {
		if (this.current == undefined) return undefined;
		let toReturn = this.current;
		this.current = this.current.next_node;
		return toReturn;
	}
	this.nextTo = function(index) {
		while (index) {
			this.next();
			index --;
		}
		return this.current;
	}
}

function List(){
	this.size		= 0;
	this.begin		= undefined;
	this.end		= undefined;
	this.print = function() {
		let iter = new List_iterator(this.begin)
		while (iter.current != undefined) {
			console.log(" : " + iter.next().value + " : ");
		}
	}
	this.addNode = function(value) {
		if (this.end === undefined) {
			this.begin   = new List_node(value, undefined);
			this.end = this.begin;
		} else {
			let buffer 	   = new List_node(value, undefined);
			this.end.next_node = buffer;
			this.end 	   = buffer;
		}
		this.size ++;
		return this.end;
	}
	this.insertNode = function(value, position){
		if (position > this.size || position < 0) {
			return null;
		} else if (position == this.size) {
			this.addNode(value);
			return this.end;
		} else if (position == 0) {
			let buffer = this.begin;
			this.begin = new List_node(value);
			this.begin.next_node = buffer;
			this.size++;
			return this.begin;
		}

			else {
			let iter = new List_iterator(this.begin);
			let buffer = new List_node(value);
			let prev = iter.nextTo(position - 1);
			buffer.next_node = prev.next_node;
			prev.next_node = buffer;
			this.size++;
			return buffer;
		}
	}
	this.popNode = function(position) {
		if (position < 0 || position >= this.size) {
			return null;
		} else if (position == 0) {
			let toReturn = this.begin;
			this.size --;
			this.begin = this.begin.next_node;
			if (this.size == 0) {
				this.end = this.begin;
			}
			return toReturn;
		} else {
			let iter = new List_iterator(this.begin);
			let prev = iter.nextTo(position - 1);
			let toReturn = prev.next_node;
			prev.next_node = prev.next_node.next_node;
			this.size --;
			return toReturn;
		}
	}
	this.find = function(value) {
		let iter = new List_iterator(this.begin);
		while(iter.current != undefined) {
			if (iter.current.value == value) return iter.current;
			iter.next();
		}
		return null;
	}
}

//--------------------------------------------------------------------------------LISTS

function numberToList(number) {
        if (typeof(number) != String) {
                number = new String(number);
        }

        let list = new List();
        let l = number.length;

        for (let i = 0; i <= l - 1; i++) {
                list.addNode(number[l - 1 - i]);
        }
        return list;
}

let list = numberToList(4567);

list.print();
