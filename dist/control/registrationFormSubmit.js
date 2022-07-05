'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const
    registrationPage = document.querySelector('#registration_page'),
    registrationForm = document.querySelector('#candidate_registration_form'),
    registrationSubmitButton = document.querySelector('#candidate_registration_form_submit_button'),
    spinner = document.querySelector('#registration_confirmation_loading'),
    confirmationMessage = document.querySelector('#registration_confirmation_message'),
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
    candidateAddressPcode = document.querySelector('#candidate_address_p_code')

    registrationSubmitButton.addEventListener(
        'click', ev => {
            ev.preventDefault()

            const privacyPolicy = document.querySelector('#candidate_privacy_policy_consent')
            //capture form data
            function captureFormData(){
                const
                personalInfo = {
                    title: candidateTitle.value,
                    forename: candidateForename.value,
                    surname: candidateSurname.value,
                    dob: candidateDob.value,
                    gender: candidateGender.value,
                    nationality: candidateNationality.value,
                },
                contactDetails = {
                    phone: candidateContactNumber.value,
                    email: candidateEmailAddress.value,
                    address: candidateAddress.value,
                    town: candidateAddressTown.value,
                    county: candidateAddressCounty.value,
                    pcode: candidateAddressPcode.value
                }

                const formData = Object.values(personalInfo).concat(Object.values(contactDetails))
                
                function validateForm(){
                    let emptyFieldCount = 0
                    for(let value of formData) value == '' && emptyFieldCount++

                    if(emptyFieldCount > 0) {
                        alert('Please fill out every field')
                        return false
                    }else{
                        return true
                    }
                }

                if(validateForm()){
                    for(let value of formData) console.log(value)
                    return true
                }else{
                    return false
                }
            } 
            
            //comfirm registration complete
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
            //check all form fields have been filled out
            if(captureFormData()){
                //make sure the privacy policy has been checked
                privacyPolicy.checked ? confirmRegistration() : alert('Please confirm that you agree to our Privacy Policy?')
            }
            
        }
    )
})