'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const
    registrationSubmitButton = document.querySelector('#candidate_registration_form_submit_button'),

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

    registrationSubmitButton.addEventListener(
        'click', ev => {
            ev.preventDefault()
            for(let i in personalInfo) console.log(personalInfo[i])
            for(let g in contactDetails) console.log(contactDetails[g])
        }
    )
})