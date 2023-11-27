import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import { SiteRow } from "./SiteRow";

export const SiteTable: React.FC<{ sites: SearchSiteModel[] }> = (props) => {
    return (
        <table className="table caption-top">
            <thead>
                <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Site Name</th>
                    <th scope="col">Manager</th>
                    <th scope="col">Location</th>
                </tr>
            </thead>
            <tbody>
                <>
                    {props.sites.map(site => (
                        <SiteRow site={site} key={site.id} />
                    ))}</>        </tbody>
        </table>
    )
}