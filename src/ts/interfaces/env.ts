export interface ENV {
    PORT: number | undefined;
    HOST: string | undefined;
    USER: string | undefined;
    PASSWORD: string | undefined;
    DATABASE: string | undefined;
}

export interface Config {
            PORT: number;
            HOST: string;
            USER: string;
            PASSWORD: string;
            DATABASE: string;
}