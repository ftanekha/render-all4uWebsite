import {isFormDataValid} from './formValidation.js'

document.addEventListener('DOMContentLoaded', ()=>{
    const
    registrationPage = document.querySelector('#registration_page'),
    registrationForm = document.querySelector('#candidate_registration_form'),
    spinner = document.querySelector('#registration_confirmation_loading'),
    confirmationMessage = document.querySelector('#registration_confirmation_message')

    registrationForm.addEventListener(
        'submit', ev => {
            ev.preventDefault()
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
            //displayErrorMessages
            function displayErrorMessages(array){
                const errorMessagesContainer = document.querySelector('error-messages-container')

                array.forEach( msg => {
                    let li = document.createElement('li')
                    li.innerText = msg
                    li.className = 'error-message'
                    errorMessagesContainer.appendChild(li)
                })
                errorMessagesContainer.style.display
            }
            function removeErrorMessages(){
                const errorMessagesContainer = document.querySelector('error-messages-container')

                const interval = setInterval(
                    ()=> {
                        if(errorMessagesContainer.children.length > 0) errorMessagesContainer.removeChild(errorMessagesContainer.firstElementChild)
                    }, 300
                )
                const timeout = setTimeout(
                    ()=> {
                        clearInterval(interval)
                        clearTimeout(timeout)
                        errorMessagesContainer.style.displayc= 'none'
                    }, (errorMessagesContainer.children + 1) * 300
                )
            }
            //validate form data
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