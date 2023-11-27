import { useEffect, useState } from "react"
import ProjectModel from "../../../models/Project/ProjectModel"
import { config } from "../../../config/Constants"
import { Link } from "react-router-dom"
import SiteRequestModel from "../../../models/Site/SiteRequestModel"

export const SiteTable: React.FC<{ user: string }> = (props) => {

    const [sites, setSites] = useState<SiteRequestModel[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            const baseUrl = config.API_URL + '/api/'
            const response = await fetch(`${baseUrl}site/getSitesByUser?userId=${props.user}`)
            if (!response.ok) {
                throw new Error("something went wrong")
            }

            setSites(await response.json())
        }

        fetchProjects()
    }, [])

    return (
        <div className="container mt-5">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Logo</th>
                        <th scope="col">Name</th>
                        <th scope="col">Site Manager</th>
                        <th scope="col">Location</th>
                    </tr>
                </thead>
                <tbody>
                    {sites.map(site => (
                        <tr key={site.id}>
                            <th scope="row">
                                {site?.logo ?
                                    <>
                                        <img src={site?.logo} width={'50'} height={'50'} alt='logo' />
                                    </>
                                    :
                                    <h4>{site?.name}</h4>}
                            </th>
                            <td scope="row">
                                <Link to={`/site/${site.id}`}>
                                    {site.name}
                                </Link>
                            </td>
                            <td>{`${site.siteManager.fname} ${site.siteManager.lname}`}</td>
                            <td>{site.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}