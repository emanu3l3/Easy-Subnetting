import { binaryAddressToNumber, binaryToNumber, numberAddressToString, numberToBinary, subnetMaskToBinary } from "./binary-conversion"

interface Subnet {
    networkAddress: number[],
    subnetMask: number[],
    defaultGateway: number[],
    broadcastAddress: number[],
    usableIps: string
}

interface SubnetDict {
    [key: number]: Subnet;
}

const getNetworkAddress = (ip: number[], subnetMaskBinary: string[]): string[] => {
    let networkAddressBinary: string[] = []

    for (let i = 0; i < 4; i++) {
        networkAddressBinary.push(numberToBinary((ip[i] & binaryToNumber(subnetMaskBinary[i])), 8))
    }
    return networkAddressBinary
}

const getUsableIpRange = (defaultGateway: number[], broadcastAddress: number[]): string => {
    let firstUsableAddress: number[] = [...defaultGateway]
    firstUsableAddress[3] = firstUsableAddress[3] + 1
    
    let lastUsableAddress: number[] = [...broadcastAddress]
    lastUsableAddress[3] = lastUsableAddress[3] - 1 
    
    return ([firstUsableAddress, lastUsableAddress]).map(numberAddressToString).join(" - ")
}

const getNumberBitForSubnetting = (numberOfSubnets: number): number => {
    let nBitForSubnetting: number = 0
    while (2 ** nBitForSubnetting < numberOfSubnets) {
        nBitForSubnetting++;
    }
    return nBitForSubnetting;
}

const doSubnetting = (networkAddressBinary: string[], subnetMask: number, numberOfSubnets: number, nBitForSubnetting: number): SubnetDict | boolean => {
    if (numberOfSubnets >= 2 ** (32 - subnetMask - 1)) {
        return false
    } 
    
    if (nBitForSubnetting >= 32 - subnetMask - 1) {
        return false
    }

    const hostBit = (32 - (subnetMask + nBitForSubnetting))

    const subnets: SubnetDict = {}
    for (let i = 0; i < 2**nBitForSubnetting; i++) {
        // combination n subnets
        const subnetToBinary = numberToBinary(i, nBitForSubnetting)
        // -------------------------------------------
        const newtworkAddressSubnet = binaryAddressToNumber((networkAddressBinary.join("").slice(0, subnetMask) + subnetToBinary + "0".repeat(hostBit)).match(/.{1,8}/g) || [])
        const subnetMaskSubnet = binaryAddressToNumber(subnetMaskToBinary(subnetMask + nBitForSubnetting))
        const defaultGatewaySubnet = binaryAddressToNumber(((networkAddressBinary.join("").slice(0, subnetMask) + subnetToBinary + "0".repeat(hostBit - 1) + "1").match(/.{1,8}/g) || []))
        const broadcastAddressSubnet = binaryAddressToNumber(((networkAddressBinary.join("").slice(0, subnetMask) + subnetToBinary + "1".repeat(hostBit)).match(/.{1,8}/g) || []))
        
        const usableIpsSubnet = getUsableIpRange(defaultGatewaySubnet, broadcastAddressSubnet)
        
        subnets[i] = {
            "networkAddress": newtworkAddressSubnet,
            "subnetMask": subnetMaskSubnet,
            "defaultGateway": defaultGatewaySubnet,
            "broadcastAddress": broadcastAddressSubnet,
            "usableIps": usableIpsSubnet
        }
    }
    return subnets
}


export { getNetworkAddress, doSubnetting, getNumberBitForSubnetting }