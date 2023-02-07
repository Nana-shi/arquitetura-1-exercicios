import { UserDatabase } from "../database/UserDatabase"
import { User } from "../models/User"
import { UserDB } from "../types"

export class UserBussiness {
    public async getUsers(q: string | undefined) {
        const userDatabase = new UserDatabase()
        const UsersDB = await userDatabase.findUsers(q)
        const users: User[] = UsersDB.map((userDB) => new User(
            userDB.id,
            userDB.name,
            userDB.email
        ))
        return users
    }
    public async createUser(input: any) {
        const { id, name, email } = input
        if (typeof id !== "string") {
            throw new Error("'id' deve ser string")
        }
        if (typeof name !== "string") {
            throw new Error("'name' deve ser string")
        }
        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }
        const userDatabase = new UserDatabase()
        const userDBExist = await userDatabase.findUserById(id)
        if (userDBExist) {
            throw new Error("'id' já existe")
        }
        const newUser = new User(
            id,
            name,
            email
        )
        const newUserDB: UserDB = {
            id: newUser.getId(),
            name: newUser.getName(),
            email: newUser.getEmail()
        }
        await userDatabase.insertUser(newUserDB)
        return { message: "Cadastro realizado com sucesso!", newUser }
    }
    public async editUser(id: string, input: any) {
        const { newId, newName, newEmail } = input
        if (!newId && !newName && !newEmail) {
            throw new Error("'id', 'name', 'email' precisam estar corretos!")
        }
        if (newId !== undefined) {
            if (typeof newId !== "string") {
                throw new Error("'id' precisa ser string")
            }
        }
        if (newName !== undefined) {
            if (typeof newName !== "string") {
                throw new Error("'name' precisa ser string")
            }
        }
        if (newEmail !== undefined) {
            if (typeof newEmail !== "string") {
                throw new Error("'email' precisa ser string")
            }
        }
        const userDatabase = new UserDatabase()
        const userDBExist = await userDatabase.findUserById(id)
        if (!userDBExist) {
            throw new Error("'id' não encontrado")
        }
        const userToEdit = new User(
            newId,
            newName,
            newEmail
        )
        const updateUserDB: UserDB = {
            id: userToEdit.getId() || userDBExist.id,
            name: userToEdit.getName() || userDBExist.name,
            email: userToEdit.getEmail() || userDBExist.email
        }
        await userDatabase.editUserById(id, updateUserDB)
        return { message: "User editado com sucesso!" }
    }
    public async deleteUser(idToDelete:string){
        const userDatabase = new UserDatabase()
            const userToDelete = await userDatabase.findUserById(idToDelete)
            if (!userToDelete) {
                throw new Error("Usuário nâo encontrado!")
            } else{
                await userDatabase.deleteUserById(idToDelete)
                return {message: "Usuário deletado com sucesso!"}
            }
    }
}