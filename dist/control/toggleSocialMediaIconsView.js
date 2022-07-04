'use strict'

document.addEventListener('DOMContentLoaded', ()=>{
    const 
    calculatedSocialMediaIconsBoundingClientRect = 880,
    socialMediaIcons =  document.querySelector('#social_media_icons')

    document.addEventListener(
        'scroll',
        ()=> {
            if(document.body.getBoundingClientRect().bottom > calculatedSocialMediaIconsBoundingClientRect){
                socialMediaIcons.style.display = 'none'
            }else{
                socialMediaIcons.style.display = 'block'
            }
        }
    )
})