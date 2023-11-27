import { useEffect, useState } from "react"
import ProjectRequestModel from "../../models/Project/ProjectRequestModel"
import { config } from "../../config/Constants";
import ProjectModel from "../../models/Project/ProjectModel";
import { Link, Redirect, useLocation } from "react-router-dom";
import { httpBodyRequest, httpGetRequest } from "../Utils/TsFunctions";
import UserModel from "../../models/User/UserModel";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { UserSearch } from "../Utils/UserSearch";
import SearchSiteModel from "../../models/Site/SearchSiteModel";

export const CreateProjectPage = () => {
    const state: any = useLocation()
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [name, setName] = useState('')


    const [validManagerEmail, setValidManagerEmail] = useState(false)
    const [projectManager, setProjectManager] = useState<UserModel>()

    const [allProjects, setAllProjects] = useState<ProjectModel[]>([])
    const [similarArray, setSimilarArray] = useState<boolean[]>([])

    const [createButton, setCreateButton] = useState(false)

    const [httpError, setHttpError] = useState('')

    const [newProjectId, setNewProjectId] = useState(0)
    const [moveToNewProject, setMoveToNewProject] = useState(false)

    const [sites, setSites] = useState<SearchSiteModel[]>([])
    const [site, setSite] = useState<SearchSiteModel>()

    const [costingId, setCostingId] = useState('')

    const [nameError, setNameError] = useState('')
    const [projectManagerError, setProjectManagerError] = useState('')
    const [dateError, setDateError] = useState('')
    const [siteError, setSiteError] = useState('')

    const [disableButton, setDisableButton] = useState(false)

    const baseUrl = config.API_URL + '/api/'

    useEffect(() => {
        const fetchSites = async () => {
            const response = await httpGetRequest(baseUrl + 'site/getAllSites', 'error fetching sites')
            setSites(response)

            if (state.state !== undefined && state.state.site !== undefined) {
                setSite(state.state.site)
                setSiteError('')
            }
        }
        fetchSites()
    }, [])

    useEffect(() => {
        setDisableButton(true)
        const sendCreateRequest = async () => {

            if (site !== undefined) {

                const similarIds = []
                for (let i = 0; i < allProjects.length; i++) {
                    if (similarArray[i]) {
                        similarIds.push(allProjects[i].id)
                    }
                }
                let pm: UserModel | null | undefined = null

                if (projectManager !== null && projectManager !== undefined && validManagerEmail) {
                    pm = projectManager
                }

                const projectRequest = new ProjectRequestModel(formatDate(startDate), formatDate(endDate), name,
                    null, 0, costingId, pm, similarIds, [], [])

                const url = `${baseUrl}project/addNewProject?siteId=${site.id}`
                const response = await httpBodyRequest(url, 'error creating project', projectRequest, 'POST')

                setNewProjectId(response.id)
                setMoveToNewProject(true)
                setStartDate(new Date())
                setEndDate(new Date())
                setName('')
                setValidManagerEmail(false)
                setProjectManager(undefined)
                setSite(undefined)
            }

        }

        if (site === null || site === undefined) {
            setSiteError('site must be assigned')
        } else {
            setSiteError('')
        }


        if (nameError === '' && projectManagerError === '' && dateError == '' && siteError === '') {
            sendCreateRequest().catch((error: any) => {
                setHttpError(error.message)
            })
        }

        setDisableButton(false)
    }, [createButton])

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await fetch(config.API_URL + `/api/project/getAllProjects`)

            if (!response.ok) {
                throw new Error("something went wrong")
            }

            const responseJson = await response.json()
            const newProjects: ProjectModel[] = []
            const newSimilarArray: boolean[] = []

            for (let r in responseJson) {
                newProjects.push(new ProjectModel(responseJson[r].id,
                    responseJson[r].startDate,
                    responseJson[r].endDate,
                    responseJson[r].name,
                    responseJson[r].status,
                    responseJson[r].totalHours,
                    responseJson[r].costingId,
                    responseJson[r].projectManager,
                    responseJson[r].features,
                    responseJson[r].terminals,
                    responseJson[r].frameworks,
                    responseJson[r].middleware,
                    responseJson[r].hosts,
                    responseJson[r].disciplines))

                newSimilarArray.push(false)
            }
            setAllProjects(newProjects)
            setSimilarArray(newSimilarArray)
        }
        fetchProjects()
    }, [])

    function formatDate(date: Date) {
        return `${date.getMonth()}/${date.getDay()}/${date.getFullYear()}`
    }

    function markAsSimilar(project: number) {
        similarArray[project] = !similarArray[project]
        console.log(similarArray)
    }

    function validUserEmail(val: UserModel) {
        setValidManagerEmail(true)
        setProjectManager(val)
        setProjectManagerError('')
    }

    function checkNameForError(val: string) {
        setName(val)
        if (val !== '') {
            setNameError('')
            return
        }
        setNameError('Project must have a name')
    }


    function setDate(date: Date | null, action: any, startOrEnd: string) {
        if (date !== null) {
            action(date)
            if (startOrEnd === 'start') {
                if (date >= endDate) {
                    setDateError('start date must be earlier than end date')
                    return
                }
                setDateError('')
            } else if (startOrEnd === 'end') {
                if (startDate >= date) {
                    setDateError('start date must be earlier than end date')
                    return
                }
                setDateError('')
            }
        }
    }

    function updateSite(site: SearchSiteModel){
        setSite(site)
        setSiteError('')
    }

    if (document.title !== `IGT - Site Keeper - Create Project`) {
        document.title = `IGT - Site Keeper - Create Project`
    }

    return (
        <>
            {moveToNewProject ?
                <Redirect to={`/project/${newProjectId}`} />
                :
                <div className="container mt-3">
                    <div className="col justify-content-start">
                        <h4 className="text-warning font-weight-bold">
                            Add New Project
                        </h4>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group mt-3">
                                <span className="input-group-text">Project Name</span>
                                <input type="text" className="form-control" placeholder=""
                                    aira-label='start date' onChange={e => checkNameForError(e.target.value)} value={name} />
                            </div>
                            <ErrorDisplay error={nameError} />
                        </div>
                        <div className="col">
                            <div className="col mt-3">
                                <span className={validManagerEmail ? "input-group-text" : "input-group-text text-danger"}>Project Manager</span>
                                {/* <input type="text" className="form-control" placeholder="user@IGT.com"
                                    aira-label='end date' onChange={e => validUserEmail(e.target.value)} value={projectManagerEmail} /> */}
                                    <UserSearch provideUserEmail={validUserEmail} role="engineer"/>
                            </div>
                            <ErrorDisplay error={projectManagerError} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="input-group mt-3">
                                <span className="input-group-text">Site</span>
                                <div className="dropdown">
                                    <button className="btn btn-primary" type="button" id="siteDropdown"
                                        data-bs-toggle="dropdown" aria-expanded="false">{site !== undefined ? <>{site.name}</> : <p>No site selected</p>}</button>
                                    <ul className="dropdown-menu overflow-table3" aria-labelledby="siteDropdown">
                                        {sites.map(site => (
                                            <li onClick={() => updateSite(site)} key={site.id}>
                                                <a className="dropdown-item" href='#'>
                                                    {site.name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <ErrorDisplay error={siteError} />
                            </div>
                        </div>
                        <div className="col">
                            <div className="input-group mt-3">
                                <span className="input-group-text">Costing Identifier</span>
                                <input type="text" className="form-control" placeholder=""
                                    aira-label='costingIdentifier' onChange={e => setCostingId(e.target.value)} value={costingId} />
                            </div>
                        </div>
                    </div>
                    <div className="input-group mt-3">
                        <div className="row">
                            <div className="col">
                                <div>Start Date: </div>
                                <DatePicker selected={startDate} onChange={(date: Date) => setDate(date, setStartDate, 'start')} />
                            </div>
                            <div className="col">
                                <div>End Date: </div>
                                <DatePicker selected={endDate} onChange={(date: Date) => setDate(date, setEndDate, 'end')} />
                            </div>
                            <ErrorDisplay error={dateError}/>
                        </div>
                    </div>

                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Start Date</th>
                                <th scope="col">End Date</th>
                                <th scope="col">Active</th>
                                <th scope="col">Total Hours</th>
                                <th scope="col">Project Manager</th>
                                <th scope="col">Similar To New Project?</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allProjects.map(project => (
                                <tr key={project.id}>
                                    <th scope="row">
                                        <Link to={`/project/${project.id}`} target="_blank">
                                            {project.name}
                                        </Link>
                                    </th>
                                    <td>{project.startDate}</td>
                                    <td>{project.endDate}</td>
                                    <td>{project.status.status}</td>
                                    <td>{project.totalHours}</td>
                                    <td>{`${project.projectManager.fname} ${project.projectManager.lname}`}</td>
                                    <td>
                                        <input className="form-check-input" type="checkbox" value="" onClick={() => markAsSimilar(project.id - 1)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="row mt-3 justify-content-end">
                        <div className="col-1">
                            {disableButton ?
                            <button className="btn btn-primary" onClick={() => setCreateButton(!createButton)} disabled>Create</button>
                        :
                        <button className="btn btn-primary" onClick={() => setCreateButton(!createButton)}>Create</button>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}