import UserModel from "./User/UserModel";

class NotificationModel{
    id: number
    user: UserModel
    message: number
    seenByUser: boolean
    link: string

    constructor(id: number,
        user: UserModel,
        message: number,
        seenByUser: boolean,
        link: string) {
        this.id = id
        this.user = user
        this.message = message
        this.seenByUser = seenByUser
        this.link = link
    }
}

export default NotificationModel