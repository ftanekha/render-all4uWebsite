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
                    ()=> spinner.style.display = 'none', 5000
                ),
                showConfirmationMessage = setTimeout(
                    ()=> {
                        //reset form input fields
                        registrationForm.reset()
                        clearInterval(showSpinner)
                        confirmationMessage.style.display = 'block'
                    }, 5000
                ),
                returnToHomePage = setTimeout(
                    ()=>{
                        confirmationMessage.style.display = 'none'
                        clearTimeout(showConfirmationMessage)
                        clearTimeout(returnToHomePage)
                        registrationPage.style.display = 'block'
                    }, 20000
                )
            }
            //display Error Messages
            function displayErrorMessages(messages){
                const errorMessagesContainer = document.querySelector('#error-messages-container')
                const errorMessagesList = document.querySelector('#error-messages-list')

                errorMessagesList.innerHTML = ''
                errorMessagesContainer.style.display = 'block'

                messages.forEach( msg => {
                    let li = document.createElement('li')
                    li.innerText = msg
                    li.className = 'error-message'
                    errorMessagesList.appendChild(li)
                })
            }
            // remove Error Messages
            function removeErrorMessages(){
                const errorMessagesContainer = document.querySelector('#error-messages-container')
                const errorMessagesList = document.querySelector('#error-messages-list')

                if(errorMessagesContainer.style.display === 'none') return

                const interval = setInterval(
                    ()=> {
                        if(errorMessagesList.children.length > 0) errorMessagesList.removeChild(errorMessagesList.firstElementChild)
                    }, 300
                )
                const timeout = setTimeout(
                    ()=> {
                        errorMessagesList.innerHTML = ''
                        errorMessagesContainer.style.display = 'none'
                        clearInterval(interval)
                        clearTimeout(timeout)
                    }, (errorMessagesList.children.length + 1) * 300
                )
            }
            //
            function triggerRemoveErrorMessages(){
                const timer = setTimeout(
                    ()=> {
                        removeErrorMessages()
                        clearTimeout(timer)
                    }, 15000
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
                if(!isValidDate(candidateDob.value)) errorMessages.push('Invalid date of birth format!')
                //telephone number
                if(!isValidTelephoneNumber(candidateContactNumber.value)) errorMessages.push('Invalid telephone number!')
                //email address
                if(!isValidEmailAddress(candidateEmailAddress.value)) errorMessages.push('Invalid email address!')
                //address (house name/number + street name)
                if(!isValidAddress(candidateAddress.value)) errorMessages.push('Invalid address!')
                //address (post code: UK)
                if(!isValidUKPostCode(candidateAddressPcode.value)) errorMessages.push('Invalid post code!')

                return errorMessages.length === 0 ? true : errorMessages
            }
            /////////////////////////////////////////////////////////////////////////////////////////
            const privacyPolicy = document.querySelector('#candidate_privacy_policy_consent')

            const isUserDataValid = isFormDataValid()

            if(!Array.isArray(isUserDataValid)){
                //make sure the privacy policy has been checked
                if(privacyPolicy.checked){
                    const formData = {
                        title: candidateTitle.value, 
                        forename: candidateForename.value,
                        surname: candidateSurname.value,
                        dob: candidateDob.value,
                        gender: candidateGender.value,
                        nationality: candidateNationality.value,
                        contact_number: candidateContactNumber.value,
                        email_address: candidateEmailAddress.value,
                        address: candidateAddress.value,
                        town: candidateAddressTown.value,
                        county: candidateAddressCounty.value,
                        post_code: candidateAddressPcode.value
                    }
                    console.table(formData)
                    const requestOptions = {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify(formData)
                    }
                    //POST data
                    fetch('../post-form-data.php', requestOptions)
                    .then(res => {
                        if(res.ok && res.status === 200){
                            return res.json()
                        }
                    })//handle bad response from server
                    .then(data => {
                        if(Array.isArray(data)){
                            console.table(data[0])
                            console.warn(data[1])
                        }else{//display success message
                            console.info(data)
                            confirmRegistration() 
                        }
                    })
                    .catch(err => console.error(err.message))
                }else{
                    return alert('Please confirm that you agree to our Privacy Policy?')
                }
            }else{
                const errorMessageRemovers = document.querySelectorAll('.removeErrorMessages')

                displayErrorMessages(isUserDataValid)
                triggerRemoveErrorMessages()

                errorMessageRemovers.forEach(el => el.addEventListener('click', removeErrorMessages))
            }
        }
    )
})