let srcNumber = "10010"
console.log("\nUnfortunately the prompt function is not working, so to enter a number to change the program source code:\nSource number: " + srcNumber)

l = srcNumber.length
resNumber = 0;

for (let i = 0; i <= l - 1; i++) {
	resNumber += srcNumber[l - 1 - i]*2**i;
}

console.log("Result number: " + resNumber + "\n")
