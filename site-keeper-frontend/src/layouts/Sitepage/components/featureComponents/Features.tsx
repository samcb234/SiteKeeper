import { useEffect, useState } from "react"
import FeatureModel from "../../../../models/Feature/FeatureModel"
import { AssociateExistingFeature } from "./AssociateFeature"
import { config } from "../../../../config/Constants";
import { Link } from "react-router-dom";
import { FeatureDisplay } from "../../../Utils/Features/FeatureDisplay";
import UserModel from "../../../../models/User/UserModel";
import { managerCheck } from "../../../Utils/TsFunctions";
import AlternateFeatureName from "../../../../models/AlternateFeatureName";

export const Features: React.FC<{ features: AlternateFeatureName[], id: string, reload: any, refresh: boolean, user: UserModel | undefined }> = (props) => {

    const [features, setFeatures] = useState<FeatureModel[]>([])
    const [existingIds, setExistingIds] = useState<number[]>([])
    const [stopUseEffect, setStopUseEffect] = useState(0)

    useEffect(() => {
        const ids: number[] = []
        for (let i = 0; i < props.features.length; i++) {
            ids.push(props.features[i].feature.id)
        }
        setExistingIds(ids)
    }, [])



    return (
        <>
            {managerCheck(props.user) ?
                <AssociateExistingFeature site={props.id} existingIds={existingIds} reload={props.reload} refresh={props.refresh} />
                :
                <></>}
            <FeatureDisplay features={props.features} id={props.id} display={false} reload={props.reload} refresh={props.refresh} user={props.user} action="site"
            similarProjects={[]} nonSimilarProjects={[]}/>
        </>
    )
}