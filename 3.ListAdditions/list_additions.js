'use strict';

//--------------------------------------------------------------------------------LISTS

function List_node(value){
        this.value              = value;
        this.next_node          = undefined;
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

function addLists(list1, list2) {
	let list3 = new List();
	let current1 = list1.begin;
	let current2 = list2.begin;
	let loan = 0;

	while (current1 != undefined || current2 != undefined)
	{
		if (current1 != undefined && current2 != undefined){
			if (current1.value + current2.value + loan > 9) {
				list3.add((current1.value + current2.value + loan)%10);
				loan = 1;
			} else {
				list3.add(current1.value + current2.value + loan);
				loan = 0;
			}
			current1 = current1.next;
			current2 = current2.next;
		} else if (current1 != undefined) {
			if (current1.value + loan > 9) {
				list3.add((current1.value + loan)%10);
				loan = 1;
			} else {
				list3.add(current1.value + loan);
				loan = 0;
			}
			current1 = current1.next;
		} else if (current2 != undefined) {
                        if (current2.value + loan > 9) {
                                list3.add((current2.value + loan)%10);
                                loan = 1;
                        } else {
                                list3.add(current2.value + loan);
                                loan = 0;
                        }
                        current2 = current2.next;
                }
	}
	if (loan == 1) list3.add(loan);

	return list3;
}

let list1 = numberToList(5);
console.log(list1.begin);
let list2 = numberToList(19);
console.log(list2.begin);
let list3 = addLists(list1, list2);
console.log(list3.begin);
