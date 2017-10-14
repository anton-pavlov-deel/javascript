let srcNumber = "asd"
console.log("\nUnfortunately the prompt function is not working, so to enter a number to change the program source code:\nSource number: " + srcNumber)

function permutation( num ) {

	let l = srcNumber.length
	let res = 0;

	if (l == 0) return undefined;
	
	for (let i = 0; i <= l - 1; i++) {
		if (num[l - 1 - i] == '1' || num[l - 1 - i] == '0'){
			res += num[l - 1 - i]*2**i
		} else {
			return undefined;
		}
	}

	return res
}

console.log("Result number: " + permutation(srcNumber) + "\n")
