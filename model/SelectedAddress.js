class SelectedAddress{
    constructor(addressId,houseAddress,landmark,direction,addressType,lat,long,generatedAddress){
        this.addressId=addressId
        this.houseAddress = houseAddress
        this.landmark = landmark
        this.direction = direction
        this.addressType = addressType
        this.lat = lat
        this.long = long
        this.generatedAddress = generatedAddress
    }
}

export default SelectedAddress;