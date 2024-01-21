import HttpException from "./http-exception";

class UserNotFoundException extends HttpException {
    constructor(id: number) {
        super(404, `Hero with id ${id} not found`);
    }
}

export default UserNotFoundException;