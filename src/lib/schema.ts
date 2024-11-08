import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(3, "Ops, username invalido").max(20, "Ops, username invalido"),
  password: z.string().min(6, "Ops, senha invalida").max(20, "Ops, senha invalida"),
})

export const registerSchema = z.object({
  username: z.string().min(3, "Ops, o username precisa ter mais de 3 caracteres").max(20, "Ops, o username precisa ter menos de 20 caracteres"),
  email: z.string().email("Ops, o email precisa ser um email valido"),
  date_of_birth: z.string().min(10, "Ops, a data de nascimento precisa ser uma data valida").max(10, "Ops, a data de nascimento precisa ser uma data valida"),
  password: z.string().min(6, "Ops, a senha precisa ter mais de 6 caracteres").max(20, "Ops, a senha precisa ter menos de 20 caracteres"),
})

export type RegisterSchema = typeof registerSchema
export type LoginSchema = typeof loginSchema