import dotenv from 'dotenv';
/**
 * This function will handle the env variables files, setting up which file 
 * to use based on the ENV parameter passed by from the playwright command 
 */
async function globalSetup() {
    if(process.env.ENV) {
        dotenv.config({
            path: `./tests/environments/.env.${process.env.ENV}`,
            override: true,
        })
    }
}
export default globalSetup;