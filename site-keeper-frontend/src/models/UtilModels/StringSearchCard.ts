class StringSearchCard {
    linkToFollow: string
    title: string
    description: string
    type: string
    tag: string

    constructor(linkToFollow: string, title: string, description: string, type: string, tag: string) {
        this.linkToFollow = linkToFollow
        this.title = title
        this.description = description
        this.type = type
        this.tag = tag
    }
}

export default StringSearchCard