class Address{
    constructor(id,uid,houseAddress,landmark,direction,addressType,lat,long,generatedAddress,profileId){
        this.id=id
        this.uid = uid
        this.houseAddress = houseAddress
        this.landmark = landmark
        this.direction = direction
        this.addressType = addressType
        this.lat = lat
        this.long = long
        this.generatedAddress = generatedAddress
        this.profileId = profileId
    }
}

export default Address;