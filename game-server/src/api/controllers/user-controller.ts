import express from "express";
import {BaseController} from "../../base/base-controller";
import UserNotFoundException from "../exceptions/user-not-found-exception";

export default class UserController extends BaseController {
    public path = "/Users";

    constructor() {
        super();
        this.initializeRoutes();
    }

    public initializeRoutes() {
        this.router.get(this.path, this.getAllUser);
        this.router.post(this.path, this.addUser);
        this.router.get(this.path + "/:userId", this.getUserById);
        // Bạn có thể thêm put, patch, delete sau.
    }

    getUserById = async (
        request: express.Request,
        response: express.Response,
        next: express.NextFunction,
    ) => {
        const userId = Number.parseInt(request.params.userId);
        this.prisma.User
            .findUnique({
                where: {
                    id: userId,
                },
            })
            .then((User:any) => {
                if (User) {
                    response.json(User);
                } else {
                    next(new UserNotFoundException(userId));
                }
            });
    };

    getAllUser = async (request: express.Request, response: express.Response) => {
        const Users = await this.prisma.User.findMany();
        response.json(Users);
    };

    addUser = async (request: express.Request, response: express.Response) => {
        const reqBody = request.body;
        const User = await this.prisma.User.create({
            data: {
                name: reqBody.name,
                origin: reqBody.origin,
                description: reqBody.description,
            },
        });
        response.json(User);
    };
}