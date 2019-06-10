export class Usuario {

    public nombre: string;
    public email: string;
    public password: string;
    public img?: string;   // opcional
    public rol?: string = 'USER_ROLE';
    public google: boolean;
    public _id: string;

    constructor(
        nombre,
        email,
        password,
        img,
        rol,
        google,
        _id
    ) {

    }
}