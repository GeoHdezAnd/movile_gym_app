import { z } from "zod";

export const memberCreateSchema = z.object({
    name: z.string().min(1, { message: "El nombre es requerido" }),
    last_name: z.string().min(1, { message: "El apellido es requerido" }),
    email: z
        .string({ message: "El email es requerido" })
        .email({ message: "El email no es válido" }),
    phone: z.string().min(1, { message: "El teléfono es requerido" }),
    gender: z.enum(["M", "F"], {
        errorMap: () => ({ message: "El género debe ser M o F" }),
    }),
    born_date: z.string().min(1, { message: "La fecha es requerida" }),
});

export type MemberCreateFields = z.infer<typeof memberCreateSchema>;
