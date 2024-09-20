
const numberToBinary = (num: number, nDigits: number = 0): string => {
    let result: string = ""
    if (num == 0) {
        return "0".repeat(nDigits)
    }
    while (num != 0) {
        result = (num % 2) + result
        num = Math.floor(num / 2)
    }

    if (nDigits){
        result =  "0".repeat(nDigits-result.length) + result
    } 

    return result
}

const binaryToNumber = (binary: string): number => {
    return parseInt(binary, 2)
}

const ipStringToNumber = (ip: string): number[] => {
    return ip.split(".").map(oct => parseInt(oct, 10))
}

const binaryAddressToNumber = (address: string[]): number[] => {
    address.forEach((el, index) => {
        address[index] = binaryToNumber(el).toString()
    })

    return address.map(el => parseInt(el, 10))
}

const ipAddressToBinary = (ip: number[]): string[] => {
    const ipBinary: string[] = []
    ip.forEach((oct) => {
        if (oct == 0) {
            ipBinary.push("0".repeat(8))    
        } else {
            ipBinary.push(numberToBinary(oct, 8))
        } 
    })

    return ipBinary
}

const numberAddressToString = (ip: number[]) => {
    return ip.join(".")
}

const subnetMaskToBinary = (subnetMask: number): string[] => {
    const subnetMaskBinary: string[] = []
    let subnetMaskCopy: number = subnetMask

    while (subnetMaskCopy >= 8) {
        subnetMaskCopy -= 8
        subnetMaskBinary.push("1".repeat(8))    
    }
    if (subnetMaskCopy != 0) {
        subnetMaskBinary.push("1".repeat(subnetMaskCopy)+"0".repeat(8 - Math.abs(subnetMaskCopy)))
    } 

    for (let i = 0; i < (4 - subnetMaskBinary.length); i++) {
        subnetMaskBinary.push("0".repeat(8))
    }

    return subnetMaskBinary
}

export { numberToBinary, binaryToNumber, ipStringToNumber, binaryAddressToNumber, subnetMaskToBinary, ipAddressToBinary, numberAddressToString}