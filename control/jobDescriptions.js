'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const 
    generalJobsTitle = document.querySelectorAll('.general_jobs_title'),
    generalJobsDescription = document.querySelectorAll('.general_jobs_description')

    for(let jobTitleIndex = 0; jobTitleIndex < generalJobsTitle.length; jobTitleIndex++){
        generalJobsTitle[jobTitleIndex].addEventListener('click', ()=>{
            const description = generalJobsDescription[jobTitleIndex]
            //hide & show job descritions accordingly
            description.classList.contains('hide') ?
            description.classList.remove('hide'):
            description.classList.add('hide')
        })
    }
})