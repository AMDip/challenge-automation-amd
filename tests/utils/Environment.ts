/**
 * This class serves as an easy way to access env variables from each environment file after global setup
 */
export class Env {
    public static BASE_URL: string = process.env.BASE_URL as string;
}