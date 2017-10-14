//--------------------------------------------------------------------------------LISTS

function List_node(value){
        this.value              = value;
        this.next_node          = undefined;
}

function List_iterator(begin){
        this.current            = begin;
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
        this.size               = 0;
        this.begin              = undefined;
        this.end                = undefined;
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
                        let buffer         = new List_node(value, undefined);
                        this.end.next_node = buffer;
                        this.end           = buffer;
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

function addLists(list1, list2) {
	let iter1 = new List_iterator(list1.begin);
	let iter2 = new List_iterator(list2.begin);
	let list3 = new List();
	let loan = 0;

	while (iter1.current != undefined && iter2.current != undefined)
	{
		if (iter1.current.value + iter2.current.value + loan > 9) {
			list3.addNode((iter1.current.value + iter2.current.value)%10);
			loan = 1;
		} else {
			list3.addNode(iter1.current.value + iter2.current.value + loan);
			loan = 0;
		}
		iter1.next();
		iter2.next();
	}
	while (iter1.current != undefined)
	{
		list3.addNode(iter1.current + loan);
		loan = 0;
		iter1.next();
	}
	while (iter2.current != undefined)
	{
		list3.addNode(iter2.current + loan);
		loan = 0;
		iter2.next();
	}
	if (loan == 1) list3.addNode(loan);

	return list3;
}

let list1 = numberToList(1);
let list2 = numberToList(2);
let list3 = addLists(list1, list2);

list3.print();
