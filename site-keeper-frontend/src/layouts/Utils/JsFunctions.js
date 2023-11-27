export const findSimilarSearchItems = (ob, term) => {
    const suggestions = []
    const key1 = 'name'
    const key2 = 'contactInfo'
    const key3 = 'type'
    const addIfSimilar = (obj) => {
        if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
            return;
        }

        else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                addIfSimilar(obj[i])
            }
        }

        else {
            if (obj.hasOwnProperty(key1) && obj[key1].toLowerCase().startsWith(term.toLowerCase()) && suggestions.length < 10
                && suggestions.indexOf(obj[key1]) === -1) {
                suggestions.push(obj[key1])
            }
            else if (obj.hasOwnProperty(key2) && obj[key2].toLowerCase().startsWith(term.toLowerCase()) && suggestions.length < 10
                && suggestions.indexOf(obj[key2]) === -1) {
                suggestions.push(obj[key2])
            }
            else if (obj.hasOwnProperty(key3) && obj[key3].toLowerCase().startsWith(term.toLowerCase()) && suggestions.length < 10
                && suggestions.indexOf(obj[key3]) === -1) {
                suggestions.push(obj[key3])
            }

            for (const k in obj) {
                if (suggestions.length < 10) {
                    addIfSimilar(obj[k])
                }
            }
        }
    }
    if (term === '') {
        return suggestions
    }

    addIfSimilar(ob)

    return suggestions.sort()
}


//takes a list of sites and iterates through it to find ones that match a specific search criteria
//list of sites is the list of sites
//filter is the list of entities(terminals, frameworks, ect) thats being used to filter sites
//term is either 'name' or 'email' to account for searching by user
//field is the actual name or email being used to search
export const findSites = (listOfSites, filter, term, field) => {
    const validSites = []
    let f = filter

    if (filter === 'site') {
        for (let i = 0; i < listOfSites.length; i++) {
            if (listOfSites[i]['name'] === field) {
                validSites.push(listOfSites[i])
            }
        }
        return validSites
    }

    if (filter !== 'middleware') {
        f = f + 's'
    }

    for (let i = 0; i < listOfSites.length; i++) {
        const site = listOfSites[i]

        if(filter !== 'terminal' && filter !== 'framework'){
            for (let j = 0; j < site[f].length; j++) {

                if (site[f][j][term] === field) {
                    validSites.push(site)
                    break
                }
            }
        }
        else{
            for (let j = 0; j < site['terminalsOnSites'].length; j++) {

                if (site['terminalsOnSites'][j][filter][term] === field) {
                    validSites.push(site)
                    break
                }
            }
        }
    }
    return validSites
}

export const searchForStrings = (ob, stringToFind) => {
    const results = []

    const search = (obj, stf) => {
        if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
            return;
        }

        else if (Array.isArray(obj)) {
            for (let i = 0; i < obj.length; i++) {
                search(obj[i], stf)
            }
        }

        else{
            for(const k in obj){
                if(typeof obj[k] === 'string'){
                    
                    if(obj[k].includes(stf) && results.indexOf(obj) === -1){
                        results.push(obj)
                    }
                }
                else{
                    search(obj[k], stf)
                }
            }
        }
    }

    search(ob, stringToFind)
    
    return results
}