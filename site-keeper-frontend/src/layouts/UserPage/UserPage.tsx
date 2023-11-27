import { useEffect, useState } from "react"
import { config } from "../../config/Constants"
import { SiteTable } from "./components/SiteTable"
import UserModel from "../../models/User/UserModel"

export const UserPage = () => {
    //this wasn't mocked up so I'm leaving this as is to make it easier to add/change stuff later :)
    const userId = (window.location.pathname).split('/')[2]

    const [user, setUser] = useState<UserModel>()

    useEffect(() => {
        const fetchUser = async () => {
            const baseUrl = config.API_URL + '/api/'
            const response = await fetch(`${baseUrl}user/getUserById?id=${userId}`)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            setUser(await response.json())
        }
        fetchUser()
    }, [])

    return (
        <>
            <div className="container mt-5">
                <h4 className="text-primary">{`${user?.fname} ${user?.lname}`}</h4>
                <p>{user?.role.role}</p>
                <p>{user?.contactInfo}</p>
            </div>
            <SiteTable user={userId} />
        </>
    )
}