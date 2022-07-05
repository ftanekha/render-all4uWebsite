'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const
    registrationPage = document.querySelector('#registration_page'),
    registrationForm = document.querySelector('#candidate_registration_form'),
    registrationSubmitButton = document.querySelector('#candidate_registration_form_submit_button'),
    spinner = document.querySelector('#registration_confirmation_loading'),
    confirmationMessage = document.querySelector('#registration_confirmation_message')

    registrationSubmitButton.addEventListener(
        'click', ev => {
            ev.preventDefault()

            const privacyPolicy = document.querySelector('#candidate_privacy_policy_consent')
            //capture form data
            function captureFormData(){
                const
                personalInfo = {
                    title: document.querySelector('#candidate_title').value,
                    forename: document.querySelector('#candidate_forename').value,
                    surname: document.querySelector('#candidate_surname').value,
                    dob: document.querySelector('#candidate_dob').value,
                    gender: document.querySelector('#candidate_gender').value,
                    nationality: document.querySelector('#candidate_nationality').value,
                },
                contactDetails = {
                    phone: document.querySelector('#candidate_contact_number').value,
                    email: document.querySelector('#candidate_email_address').value,
                    address: document.querySelector('#candidate_address').value,
                    town: document.querySelector('#candidate_address_town').value,
                    county: document.querySelector('#candidate_address_county').value,
                    pcode: document.querySelector('#candidate_address_p_code').value
                }

                for(let i of Object.values(personalInfo)) console.log(i)
                for(let i of Object.values(contactDetails)) console.log(i)
            } 
            captureFormData()
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
            //make sure the privacy policy has been checked
            privacyPolicy.checked ? confirmRegistration() : alert('Please confirm that you agree to our Privacy Policy?')
            
        }
    )
})