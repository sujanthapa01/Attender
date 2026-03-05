import * as bcrypt from "bcrypt"


const saltRounds: number = 10
export async function hashPassword(password: string) {
    return bcrypt.hashPassword(password, saltRounds)
}

export async function comparePassword(plainPassword: string, hashedPassword: string): Promise<string> {

    return bcrypt.comparePassword(plainPassword, hashPassword)

}