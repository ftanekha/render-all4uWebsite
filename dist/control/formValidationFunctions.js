function hasEmptyFields(array){
    let emptyFields = 0

    array.forEach(el => {
        if(el['value'] === '') emptyFields++
    })
    return emptyFields > 0
}
///////////////////////////////////////////////////////////////////////////
function isValidStringInput(input){
    //only contains letters, dashes, apostrophes and whitespaces
    const regex = /^[a-zA-Z-' ]*$/g
    const result = regex.test(input)
    
    if(result) return result > 3
    return false
}
//////////////////////////////////////////////////////////////////////////
function arrayHasAllValidStrings(array){
    const count = 0

    array.forEach(
        el => {
            if(!isValidStringInput(el['value'])) count++
        }
    )

    return count === 0
}
///////////////////////////////////////////////////////////////////////////
function isValidDate(input){
    //only contains letters, dashes, apostrophes and whitespaces
    const regex = /^[a-zA-Z0-9/-']{10}$/g
    const result = regex.test(input)
    return result
}
//////////////////////////////////////////////////////////////////////////
function isValidAddress(input){
     //only contains letters, dashes, apostrophes and whitespaces
     const regex = /^[0-9/-]{40}$/g
     const result = regex.test(input)
     return result
}
//////////////////////////////////////////////////////////////////////////
function isValidUKPostCode(input){
    //only contains letters, dashes, apostrophes and whitespaces
    const regex = /^[a-zA-Z0-9 ]{6,8}$/g
    const result = regex.test(input)
    return result
}
///////////////////////////////////////////////////////////////////////////
function isValidEmailAddress(userEmailAddress){
    /*check that user email address:*/
    //comprises alphanumeric characters (dot excluded), and is 6 to 20 characters long (e.g. ghxnyab234)
    //followed by the @ symbol
    //followed by another series of alphanumeric characters, with a dot at the end (e.g. google.com or outlook.com)
    const regex = /^[\w-\.]{4,30}@([\w-]+\.)+[\w-]{2,10}$/g
    const result = regex.test(userEmailAddress)
    //returns a boolean value
    return result
}
///////////////////////////////////////////////////////////////////////////
function isValidTelephoneNumber(userTelephone){
    const regex = /^\+?(?:\d\s?){7,15}$/g
    const result = regex.test(userTelephone)
    return result
}

export {
    hasEmptyFields, arrayHasAllValidStrings, isValidDate, isValidAddress, 
    isValidUKPostCode, isValidEmailAddress, isValidTelephoneNumber
}