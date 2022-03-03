# all4uhealthcare-website

This repository contains the source code for the all4uhealthcare-website, publicly available at https://www.all4uhealthcare.co.uk.

The website is hosted on Amazon S3 with Cloudfront (for caching), this results in massive cost savings with the website costing less than £1 a month.

## Development

Feel free to develop as you see fit. Just make sure that any production artefacts are available in the `./dist` folder when the deploy job is run on our [deploy Github Action workflow](.github/workflows/deploy.yml). For static content this just means committing the content to the `./dist` folder. For dynamic content you can add a job to the workflow e.g. it might run `npm run build` then move the resulting artefacts to the `./dist` folder.

## Deployment

We have defined a [Github Action workflow](.github/workflows/deploy.yml) for deploying the website for commits on the main branch. The workflow runs a job that
1. Uploads the dist folder to website's AWS S3 bucket, `s3://all4uhealthcare-landing`
2. Invalidates the Cloudfront distribution, `EW7DLIV5T3XNG`, related to the website.
   
Updates to the website are almost instant!
