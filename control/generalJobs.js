'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const 
    sourceForJobs = document.querySelector('#general_jobs_template').innerHTML,
    templateForJobs = Handlebars.compile(sourceForJobs)

    const generalJobs= {
        jobs: [
            {
                title: 'registered general nurse',
                abbr: 'rgn', 
                duties: [
                    'can be nurse in charge when on duty', 
                    'facilitate a high standard of care through written care plans as directed by the Matron',
                    'delegate work to all care staff and monitor the care given to patients',
                    'help induct, train and supervise colleagues and junior members of staff in all aspects of their work',
                    'provide and maintain the standard of care to our patients as required by NMC code of professional conduct',
                    'similar additional duites as (RMN) below'
                ]
            },
            {
                title: 'registered mental nurse',
                abbr: 'rmn',  
                duties: [
                    'additional to (RGN) duties:',
                    'ensure the highest possible standards of care are maintained through your own efforts and those that have been delegated to care for patients',
                    'ensure that all aspects of their care needs, i.e. physical, emotional, spiritual and social are met',
                    'keep all records of care given in the patients care plan after each shift',
                    'develop a relationship of trust and friendship with the patients and their families',
                    'act as a Named Nurse to a group of patients to ensure continuality of care is maintained to the patient and their families',
                ]
            },
            {
                title: 'registered nurse with learning disability',
                abbr: 'rnld',  
                duties: [
                    'assessing and planning care requirements',
                    'advising about and organising appropriate care, resources or benefits',
                    'assisting with basic, practical living skills, such as getting dressed, preparing food and travelling',
                    'liaising with relatives, colleagues and other social welfare or healthcare professionals',
                    'helping to enable clients to have full and independent lives',
                    'writing records and reports'
                ]
            },
            {
                title: 'advanced nurse practitioner',
                abbr: 'anp',  
                duties: [
                    `act as an autonomous practitioner working independently and in conjunction with 
                    other health care professionals to assess, diagnose and treat the conditions of patients
                    attending within primary care initiating direct referrals as appropriate`,
                    'provide expert professional advice to patients, carers and colleagues and ensure the maintenance of clinical excellence',
                    `develop new and innovative concepts, models, methods and practices to deliver new
                    and improved primary care services to meet the needs of the practice and PCT population`,
                    'provide education and training to other staff and students',
                    'undertake research as part of the role'
                ]
            },
            {
                title: 'registered child nurse',
                abbr: 'rcn',  
                duties: [
                    'assessing and planning nursing care requirements',
                    'providing care before and after operations',
                    'monitoring and administering medication, injections and intravenous infusions',
                    'checking on the condition of patients',
                    'supervising junior staff',
                    'obtaining parental consent for treatment',
                    'providing information, emotional support and reassurance to patients and relatives'
                ]
            },
            {
                title: 'operating department practitioner',
                abbr: 'odp',  
                duties: [
                    'work with anaesthetistc before surgery',
                    'prepare all the necessary instruments and equipment for surgery, including microscopes, lasers and endoscopes',
                    'provide the correct surgical instruments and materials to the surgeon',
                    'be responsible for all surgical instruments, equipment and swabs during the operation',
                    'act as a link between the surgical team and other parts of the theatre and hospital',
                    'support and monitor the patient on their arrival into the recovery unit',
                    'provide appropriate treatment until they have recovered from the effects of the anaesthesia and/or surgery',
                    'assess the patient so they can be discharged back to a ward'
                ]
            },
            {
                title: 'scrub',
                abbr: '',  
                duties: ['works with surgeons', 'theatre duties']
            },
            {
                title: 'health care assistant (band 2,3,4)',
                abbr: 'hca',  
                duties: [
                    'assisting with daily living activities such as eating, showering and using the toilet',
                    'utilising equipment to move patients when necessary',
                    'taking the patient’s vital signs such as blood pressure and temperature',
                    'adhering to professional standards',
                    'delivering reports to Case Managers and reviewing any important changes in the patient’s condition'
                ]
            },
            {
                title: 'case support worker',
                abbr: 'csw',  
                duties: ['similar to (HCA)']
            }
        ]
    }

    document.querySelector('#general_jobs').innerHTML = templateForJobs(generalJobs)    
})