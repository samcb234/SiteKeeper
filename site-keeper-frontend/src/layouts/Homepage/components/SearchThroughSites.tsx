import '../../../styles/SearchThroughSites.css';

import { useState } from "react";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import { findSimilarSearchItems, findSites } from "../../Utils/JsFunctions";
import { SiteRow } from "./SiteRow";
import { SiteTable } from "./SiteTable";
import { SiteLogos } from "./SiteLogos";
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import TableRowsIcon from '@mui/icons-material/TableRows'
import GridOnIcon from '@mui/icons-material/GridOn';
import SearchFilter from '../../../models/SearchFilterModel';
import { searchAllSites } from '../../Utils/TsFunctions';

export const SearchThroughSites: React.FC<{ sites: SearchSiteModel[]}> = (props) => {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Site')
    const [suggestions, setSuggestions] = useState<SearchFilter[]>([])
    const [filteredSites, setFilteredSites] = useState<SearchSiteModel[]>([])

    const [duration, setDuration] = useState('')

    const [searched, setSearched] = useState(false)

    const [gridView, setGridView] = useState(true)


    function updateSearch(value: string) {
        setSearch(value)
        setSuggestions(searchAllSites(props.sites, value))
    }

    function selectValueToSearchBy(value: SearchFilter) {
        setSearch(value.phrase)
        
        setFilter(value.filter.charAt(0).toUpperCase() + value.filter.slice(1))
        setSuggestions([])
    }


    function searchThroughSites() {
        const start = performance.now()
        let term = 'name'
        if (filter === 'email') {
            term = 'contactInfo'
        } else if (filter === 'discipline') {
            term = 'type'
        }
        setFilteredSites(findSites(props.sites, filter.toLowerCase(), term, search))
        setSearched(true)
        const end = performance.now() - start

        setDuration(`${end / 1000}`)
    }

    const SiteView: React.FC<{sites: SearchSiteModel[], gridView: boolean}> = (props) => {
        return(
            <>
            {props.gridView ?
            <SiteLogos sites={props.sites}/>
        :
        <SiteTable sites={props.sites}/>}</>
        )
    }

    return (
        <>
            <div className={"container-fluid"}>
                <div className="row mt-3">
                    <div className="col-6">
                        <input type="text" className="form-control" placeholder="Search Sites"
                            aira-label='start date' onChange={e => updateSearch(e.target.value)} value={search} />
                        {search === '' ?
                        <></>
                    :
                    <>{suggestions.map(suggestion => (
                        <span className="input-group-text" onClick={() => selectValueToSearchBy(suggestion)}>{`${suggestion.phrase}    (found in ${suggestion.filter})`}</span>
                    ))}
                    </>}
                    </div>
                    <div className="col-6">
                        <div className={"container"}>
                            <div className={"row"}>
                                <div className={"col-3"}>
                                    <button className="btn btn-primary w-100" onClick={() => searchThroughSites()}><SearchIcon/>Search</button>
                                </div>
                                <div className={"col-4"}>
                                    <button className="btn btn-primary w-100" onClick={()=>setGridView(!gridView)}>{gridView ? <><TableRowsIcon/> View as table</> : <><GridOnIcon/> View as grid</>}</button>
                                </div>
                                <div className={"col-5"}>
                                    <div className="dropdown">
                                        <span className={"filter"}>Filter By:</span>
                                        <button className="btn btn-warning" type="button"
                                                id="dropdownMenuButton1" data-bs-toggle='dropdown' aria-expanded='false'>
                                            <ArrowDropDownIcon/> {filter}
                                        </button>
                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                            <li onClick={() => setFilter('Site')}>
                                                <a className="dropdown-item" href="#">
                                                    Site
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Discipline')}>
                                                <a className="dropdown-item" href="#">
                                                    Discipline
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Terminal')}>
                                                <a className="dropdown-item" href="#">
                                                    Terminal
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Framework')}>
                                                <a className="dropdown-item" href="#">
                                                    Framework
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Middleware')}>
                                                <a className="dropdown-item" href="#">
                                                    Middleware
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Host')}>
                                                <a className="dropdown-item" href="#">
                                                    Host
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('Feature')}>
                                                <a className="dropdown-item" href="#">
                                                    Feature
                                                </a>
                                            </li>
                                            <li onClick={() => setFilter('User')}>
                                                <a className="dropdown-item" href="#">
                                                    User
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            { searched ? <div className="alert alert-primary mt-3">Displayed {filteredSites.length} site(s) with {filter} {search} in {duration} seconds</div> : <></> }
    <>
    {filteredSites.length === 0 && search === '' ?
                <SiteView sites={props.sites} gridView={gridView}/> 
                :
                <SiteView sites={filteredSites} gridView={gridView}/>}
    </>
    </>
    )
}