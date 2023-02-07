import { Request, Response } from "express"
import { UserBussiness } from "../business/UserBusiness"

export class UserController {
    public getUsers = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
            const userBusiness = new UserBussiness()
            const output = await userBusiness.getUsers(q)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    public createUser = async (req: Request, res: Response) => {
        try {
            const { id, name, email } = req.body
            const input = {
                id,
                name,
                email
            }
            const userBusiness = new UserBussiness()
            const output = await userBusiness.createUser(input)
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    public editUser = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
            const newId = req.body.id
            const newName = req.body.name
            const newEmail = req.body.email
            const input = {
                newId,
                newName,
                newEmail
            }
            const userBusiness = new UserBussiness()
            const output = await userBusiness.editUser(id, input)            
            res.status(200).send(output)
        } catch (error) {
            console.log(error)
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
    public deleteUser = async (req: Request, res: Response) => {
        try {
            const idToDelete = req.params.id
            const userBusiness = new UserBussiness()
            const output = await userBusiness.deleteUser(idToDelete)
            res.status(200).send(output)

        } catch (error) {
            console.log(error)
            if (req.statusCode === 200) {
                res.status(500)
            }
            if (error instanceof Error) {
                res.send(error.message)
            } else {
                res.send("Erro inesperado")
            }
        }
    }
}