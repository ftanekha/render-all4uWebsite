import {
    hasEmptyFields, arrayHasAllValidStrings, isValidDate, isValidAddress, 
    isValidUKPostCode, isValidEmailAddress, isValidTelephoneNumber
} from './formValidationFunctions.js'

const
candidateTitle = document.querySelector('#candidate_title'),
candidateForename = document.querySelector('#candidate_forename'),
candidateSurname = document.querySelector('#candidate_surname'),
candidateDob = document.querySelector('#candidate_dob'),
candidateGender = document.querySelector('#candidate_gender'),
candidateNationality = document.querySelector('#candidate_nationality'),
candidateContactNumber = document.querySelector('#candidate_contact_number'),
candidateEmailAddress = document.querySelector('#candidate_email_address'),
candidateAddress = document.querySelector('#candidate_address'),
candidateAddressTown = document.querySelector('#candidate_address_town'),
candidateAddressCounty = document.querySelector('#candidate_address_county'),
candidateAddressPcode = document.querySelector('#candidate_address_p_code'),

candidateInfo = [
    candidateTitle, candidateForename, candidateSurname, candidateGender, 
    candidateNationality, candidateAddressTown, candidateAddressCounty
]


function isFormDataValid(){
    const errorMessages = []
    //no blank fields allowed
    if(hasEmptyFields(candidateInfo)) errorMessages.push('Please fill out every input field!')
    //validate alpha text
    if(!arrayHasAllValidStrings(candidateInfo)) errorMessages.push('Invalid text format detected!')
    //date
    if(!isValidDate(candidateDob)) errorMessages.push('Invalid date of birth format!')
    //telephone number
    if(!isValidTelephoneNumber(candidateContactNumber)) errorMessages.push('Invalid telephone number!')
    //email address
    if(!isValidEmailAddress(candidateEmailAddress)) errorMessages.push('Invalid email address!')
    //address (house name/number + street name)
    if(!isValidAddress(candidateAddress)) errorMessages.push('Invalid address!')
    //address (post code: UK)
    if(!isValidUKPostCode(candidateAddressPcode)) errorMessages.push('Invalid post code!')

    return errorMessages.length > 0 ? true : errorMessages
}

export {isFormDataValid}