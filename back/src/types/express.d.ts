// Este arquivo adiciona uma nova propriedade ao objeto Request do Express para que possamos armazenar os dados do usuário autenticado.
declare namespace Express {
  export interface Request {
    user?: {
      id: number;
      email: string;
    };
  }
}