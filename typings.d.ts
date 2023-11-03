declare module '*.module.css';
declare module '*.png';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.svg';
declare namespace NodeJS {
    interface ProcessEnv {
        BASE_URL: string;
    }
}
