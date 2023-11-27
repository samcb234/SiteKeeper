import FeatureModel from "./Feature/FeatureModel"

class AlternateFeatureName {
    name: string
    feature: FeatureModel

    constructor(name: string, feature: FeatureModel){
        this.feature = feature
        this.name = name
    }
}

export default AlternateFeatureName