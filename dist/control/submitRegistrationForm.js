import {
    hasEmptyFields, arrayHasAllValidStrings, isValidDate, isValidAddress, 
    isValidUKPostCode, isValidEmailAddress, isValidTelephoneNumber
} from './formValidationFunctions.js'

document.addEventListener('DOMContentLoaded', ()=>{
    const
    registrationPage = document.querySelector('#registration_page'),
    registrationForm = document.querySelector('#candidate_registration_form'),
    spinner = document.querySelector('#registration_confirmation_loading'),
    confirmationMessage = document.querySelector('#registration_confirmation_message')

    registrationForm.addEventListener(
        'submit', ev => {
            ev.preventDefault()
            //confirm registration complete
            function confirmRegistration () {
                registrationPage.style.display = 'none'
                spinner.style.display = 'block'

                const 
                showSpinner = setInterval(
                    ()=> spinner.style.display = 'none', 5e3
                ),
                showConfirmationMessage = setTimeout(
                    ()=> {
                        //reset form input fields
                        registrationForm.reset()
                        clearInterval(showSpinner)
                        confirmationMessage.style.display = 'block'
                    }, 5e3
                ),
                returnToHomePage = setTimeout(
                    ()=>{
                        confirmationMessage.style.display = 'none'
                        clearTimeout(showConfirmationMessage)
                        clearTimeout(returnToHomePage)
                        registrationPage.style.display = 'block'
                    }, 1.5e4
                )
            }
            //display Error Messages
            function displayErrorMessages(messages){
                const errorMessagesContainer = document.querySelector('#error-messages-container')
                const errorMessagesList = document.querySelector('#error-messages-list')

                messages.forEach( msg => {
                    let li = document.createElement('li')
                    li.innerText = msg
                    li.className = 'error-message'
                    errorMessagesList.appendChild(li)
                })
                errorMessagesContainer.style.display
            }
            // remove Error Messages
            function removeErrorMessages(){
                const errorMessagesContainer = document.querySelector('#error-messages-container')
                const errorMessagesList = document.querySelector('#error-messages-list')

                const interval = setInterval(
                    ()=> {
                        if(errorMessagesList.children.length > 0) errorMessagesList.removeChild(errorMessagesList.firstElementChild)
                    }, 300
                )
                const timeout = setTimeout(
                    ()=> {
                        clearInterval(interval)
                        clearTimeout(timeout)
                        errorMessagesContainer.style.display = 'none'
                    }, (errorMessagesList.children + 1) * 300
                )
            }
            //validate form data////////////////////////////////////////////////////////////////////
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

            candidateInfoText = [
                candidateTitle, candidateForename, candidateSurname, candidateGender, 
                candidateNationality, candidateAddressTown, candidateAddressCounty
            ]


            function isFormDataValid(){
                const errorMessages = []
                //no blank fields allowed
                if(hasEmptyFields(candidateInfoText)) errorMessages.push('Please fill out every input field!')
                //validate alpha text
                if(!arrayHasAllValidStrings(candidateInfoText)) errorMessages.push('Invalid text format detected!')
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
            /////////////////////////////////////////////////////////////////////////////////////////
            const privacyPolicy = document.querySelector('#candidate_privacy_policy_consent')
            
            if(!Array.isArray(isFormDataValid)){
                //make sure the privacy policy has been checked
                privacyPolicy.checked ? confirmRegistration() : alert('Please confirm that you agree to our Privacy Policy?')
            }else{
                displayErrorMessages(isFormDataValid)

                const timer = setTimeout(
                    ()=> {
                        removeErrorMessages()
                        clearTimeout(timer)
                    }, 6000
                )
            }
        }
    )
})