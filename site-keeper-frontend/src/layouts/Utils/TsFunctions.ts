import { config } from "../../config/Constants"
import AlternateFeatureName from "../../models/AlternateFeatureName"
import FeatureModel from "../../models/Feature/FeatureModel"
import FrameworkModel from "../../models/Inventory/FrameworkModel"
import InventoryModel from "../../models/Inventory/InventoryModel"
import MessageModel from "../../models/Message/MessageModel"
import BaseDisciplineModel from "../../models/Disciplines/BaseDisciplineModel"
import ProjectModel from "../../models/Project/ProjectModel"
import SearchSiteModel from "../../models/Site/SearchSiteModel"
import StringSearchCard from "../../models/UtilModels/StringSearchCard"
import Terminal from "../../models/Inventory/Terminal"
import TerminalsOnSites from "../../models/Inventory/TerminalsOnSites"
import SearchFilter from "../../models/SearchFilterModel"
import UserModel from "../../models/User/UserModel"
import UserRequestModel from "../../models/User/UserRequestModel"

export async function httpGetRequest(url: string, errorMessage: string){
    let response = null;
    let responseJson = null;
    try {
        response = await fetch(url);

        if(!response.ok){
            throw new Error(errorMessage)
        }

        responseJson = await response.json()
    } catch(error) {
        // Error handling here!
        console.log(error);
    }

    return responseJson
}

export async function httpBodyRequest(url: string, error: string, body: any, request: string){
    const requestOptions = {
        method: request,
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }
    const response = await fetch(url, requestOptions)
    if(!response.ok){
        throw new Error(error)
    }
    const responseJson = await response.json()
    return responseJson
}

export const searchAllSites = (sites: SearchSiteModel[], stringToSearch: string) =>{
    const out: SearchFilter[] = []

    const searchDiscipline = (disciplines: BaseDisciplineModel[], s: string) => {
        for(let i = 0; i < disciplines.length; i++){
            outArrayCheck(disciplines[i].discipline.type, s, 'discipline')
        }
    }

    const searchTerminalsAndFrameworks = (terminals: TerminalsOnSites[], s: string) =>{
        for(let i = 0; i < terminals.length; i++){
            const terminal = terminals[i].terminal
            const framework = terminals[i].framework
            outArrayCheck(terminal.name, s, 'terminal')
            if(terminal.description !== undefined && terminal.description !== null){
                outArrayCheck(terminal.description, s, 'terminal')
            }
            outArrayCheck(framework.name, s, 'framework')
            if(framework.description !== null && framework.description !== undefined){
                outArrayCheck(framework.description, s, 'framework')
            }
        }
    }

    const searchInventory = (inventory: InventoryModel[], s: string, type: string) => {
        for(let i = 0; i < inventory.length; i++){
            outArrayCheck(inventory[i].name, s, type)
            if(inventory[i].description !== null && inventory[i].description !== undefined){
                outArrayCheck(inventory[i].description, s, type)
            }
        }
    }

    const searchFeature = (features: AlternateFeatureName[], s: string) => {
        for(let i = 0; i < features.length; i++){
            const feature = features[i]
            outArrayCheck(feature.name, s, 'feature')
            outArrayCheck(feature.feature.description, s, 'feature')
            for(let j = 0; j < feature.feature.disciplines.length; j ++){
                outArrayCheck(feature.feature.disciplines[j].type, s, 'feature')
            }
        }
    }

    const searchUser = (users: UserRequestModel[], s: string) => {
        for(let i = 0; i < users.length; i++){
            const user = users[i]
            outArrayCheck(user.fname + ' ' + user.fname, s, 'user')
            outArrayCheck(user.contactInfo, s, 'user')
        }
    }

    const searchProjects = (projects: ProjectModel[], s: string) => {
        for(let i = 0; i < projects.length; i++){
            const project = projects[i]
            outArrayCheck(project.name, s, 'project')
        }
    }

    const searchSite = (site: SearchSiteModel, s: string) =>{
        outArrayCheck(site.abbreviation, s, 'site')
        outArrayCheck(site.name, s, 'site')
        outArrayCheck(site.location, s, 'site')

        searchDiscipline(site.disciplines, s)
        searchTerminalsAndFrameworks(site.terminalsOnSites, s)
        searchInventory(site.middleware, s, 'middleware')
        searchInventory(site.hosts, s, 'host')
        searchFeature(site.features, s)
        searchUser(site.users, s)
        searchProjects(site.projects, s)
    }

    const outArrayCheck = (phrase: string | undefined, inputString: string, filter: string) =>{
        if(phrase !== undefined && phrase.startsWith(inputString)){
            for(let i = 0; i < out.length; i++){
                if(out[i].filter === filter && out[i].phrase === phrase){
                    return
                }
            }
            out.push(new SearchFilter(phrase, filter))
        }
    }

    for(let i = 0; i<sites.length; i++){
        searchSite(sites[i], stringToSearch)
    }

    return out
}

export const stringSearch = (sites: SearchSiteModel[], stringToSearch: string) => {
    const cards: StringSearchCard[] = []

    //searching through messages
    const searchMessages = (messages: MessageModel[] | undefined, str: string, link: string, tag: string) => {
        if(messages !== undefined){
            for(let i = 0; i < messages.length; i++){
                const senderName: string =  `${messages[i].sender.fname} ${messages[i].sender.lname}`
                if(messages[i].message.includes(str) || senderName.includes(str)){
                    cards.push(new StringSearchCard(link, senderName, messages[i].message, 'message', tag))
                }
            }
        }
    }

    //searching through middleware and hosts
    const searchInventory = (inventory: InventoryModel[], str: string, link: string, tag: string) => {
        for(let i = 0; i < inventory.length; i++){
            if(inventory[i].description?.includes(str) || inventory[i].name.includes(str)){
                cards.push(new StringSearchCard(link, inventory[i].name, String(inventory[i].description), 'inventory', tag))
            }
        }
    }

    const searchTerminals = (terminals: Terminal[], str: string, link: string, tag: string) => {
        for(let i = 0; i < terminals.length; i++){
            if(terminals[i].description?.includes(str) || terminals[i].name.includes(str)){
                cards.push(new StringSearchCard(link, terminals[i].name, String(terminals[i].description), 'terminal', tag))
            }
        }
    }

    const searchFrameworks = (frameworks: FrameworkModel[], str: string, link: string, tag: string) => {
        for(let i = 0; i < frameworks.length; i++){
            if(frameworks[i].description?.includes(str) || frameworks[i].name.includes(str)){
                cards.push(new StringSearchCard(link, frameworks[i].name, String(frameworks[i].description), 'framework', tag))
            }
        }
    }

    const searchTerminalsAndFrameworks = (terminalsOnSites: TerminalsOnSites[], str: string, link: string, tag: string) => {
        for(let i = 0; i < terminalsOnSites.length; i++){
            const terminal: Terminal = terminalsOnSites[i].terminal
            const framework: FrameworkModel = terminalsOnSites[i].framework

            if(terminal.description?.includes(str) || terminal.name.includes(str)){
                cards.push(new StringSearchCard(link, terminal.name, String(terminal.description), 'terminal', tag))
            }
            if(framework.description?.includes(str) || framework.name.includes(str)){
                cards.push(new StringSearchCard(link, framework.name, String(framework.description), 'framework', tag))
            }
        }
    }

    const searchFeatures = (features: AlternateFeatureName[], str: string, link: string, tag: string) =>{
        for(let i = 0; i < features.length; i++){
            if(features[i].feature.description.includes(str) || features[i].name.includes(str) || features[i].feature.name.includes(str)){
                cards.push(new StringSearchCard(link, features[i].name, features[i].feature.description, 'feature', tag))
            }
        }
    }

    const searchUsers = (users: UserModel[], str: string, link: string, tag: string) => {
        for(let i = 0; i < users.length; i++){
            const fullName: string = `${users[i].fname} ${users[i].lname}`
            if(users[i].contactInfo.includes(str) || fullName.includes(str)){
                cards.push(new StringSearchCard(link, fullName, users[i].contactInfo, 'user', tag))
            }
        }
    }

    const searchProjects = (projects: ProjectModel[], str: string) => {
        for(let i = 0; i < projects.length; i++){
            const link = `/project/${projects[i].id}`
            const tag = `Belongs to: ${projects[i].name}`
            if(projects[i].name.includes(str)){
                
                cards.push(new StringSearchCard(link, projects[i].name, `Project ${projects[i].name}`, 'project', tag))
            }

            for(let j = 0; j < projects[i].disciplines.length; j ++){
                searchMessages(projects[i].disciplines[j]?.costing?.messages, str, link, tag)
            }

            searchInventory(projects[i].hosts, str, link, tag)
            searchInventory(projects[i].middleware, str, link, tag)
            searchTerminals(projects[i].terminals, str, link, tag)
            searchFrameworks(projects[i].frameworks, str, link, tag)
            searchFeatures(projects[i].features, str, link, tag)
        }
    }

    const searchSites = (los: SearchSiteModel[], str: string) => {
        for(let i = 0; i < los.length; i++){
            const link = `/site/${los[i].id}`
            const tag = `Belongs to: ${los[i].name}`
            if(los[i].name.includes(str) || los[i].location.includes(str)){
                cards.push(new StringSearchCard(link, los[i].name, `Site ${los[i].name}`, 'Site', ""))
            }

            searchInventory(los[i].hosts, str, link, tag)
            searchInventory(los[i].middleware, str, link, tag)
            searchTerminalsAndFrameworks(los[i].terminalsOnSites, str, link, tag)
            searchFeatures(los[i].features, str, link, tag)

            searchProjects(los[i].projects, str)
        }
    }

    searchSites(sites, stringToSearch)
    return cards

}

export const adminCheck = (user: UserModel | undefined) =>{
    return user !== undefined && user.role.role === 'admin'
}

export const managerCheck = (user: UserModel | undefined) =>{
    return user?.role.role === 'manager' || adminCheck(user)
}

export const engineerCheck = (user: UserModel | undefined) =>{
    return user?.role.role === 'engineer' || managerCheck(user)
}

export const userCheck = (user: UserModel | undefined) =>{
    return user?.role.role === 'user' || engineerCheck(user)
}