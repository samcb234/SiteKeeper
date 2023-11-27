import { useEffect, useState } from "react";
import FeatureModel from "../../../models/Feature/FeatureModel";
import { Link } from "react-router-dom";
import { AssociateExistingFeature } from "../../ProjectPage/components/AssociateFeature";
import { ProjectsAndFeaturesDisplay } from "../ProjectsAndFeaturesDisplay";
import UserModel from "../../../models/User/UserModel";
import { engineerCheck } from "../TsFunctions";
import { SimilarProjects } from '../../ProjectPage/components/SimilarProjects';
import ProjectModel from "../../../models/Project/ProjectModel";
import AlternateFeatureName from "../../../models/AlternateFeatureName";

//this is slightly different than the other inventory display components because there is more information to display
export const FeatureDisplay: React.FC<{
    features: AlternateFeatureName[], id: string, display: boolean, reload: any, refresh: boolean, user: UserModel | undefined,
    action: string, similarProjects: ProjectModel[], nonSimilarProjects: ProjectModel[]
}> = (props) => {


    const [existingIds, setExistingIds] = useState<number[]>([])

    const [disciplines, setDisciplines] = useState<{ [key: string]: AlternateFeatureName[] }>({})


    useEffect(() => {
        const ids: number[] = []
        for (let i = 0; i < props.features.length; i++) {
            ids.push(props.features[i].feature.id)
        }
        setExistingIds(ids)
    }, [props.refresh, props.features])


    useEffect(() => {
        if (props.features !== undefined) {
            const newDisciplines: { [key: string]: AlternateFeatureName[] } = {}
            for (let f in props.features) {
                const feature: AlternateFeatureName = props.features[f]

                for (let d in feature.feature.disciplines) {
                    const disciplineType = feature.feature.disciplines[d].type

                    if (newDisciplines[disciplineType] === undefined) {
                        newDisciplines[disciplineType] = []
                    }
                    newDisciplines[disciplineType].push(feature)
                }
            }

            setDisciplines(newDisciplines)

        }
    }, [props.features, props.refresh])

    const Features: React.FC<{
        features: AlternateFeatureName[], reload: any, refresh: any, similarProjects: ProjectModel[],
        nonSimilarProjects: ProjectModel[], user: UserModel | undefined, id: string, action: string
    }> = (props) => {
        return (
            <>
                {props.features.map(feature => (
                    <>
                        <div key={feature.feature.id} className="container">
                            <div className="row">
                                <div className="col-4">
                                    {feature.feature.img ?
                                        <img src={feature.feature.img} width='50' height='50' alt="img" />
                                        :
                                        <img src={require('../../../images/terminalplaceholder.jpg')} width='150' height='150' alt='feature' />
                                    }
                                </div>
                                <div className="col">
                                    <Link to={`/feature/${feature.feature.id}`}>
                                        <h4 className="text-warning font-weight-bold">
                                            {`${feature.name} (${feature.feature.name})`}
                                        </h4>
                                    </Link>
                                    <p>{feature.feature.description}</p>
                                </div>
                                {props.action === "project" ?
                                    <div className="col">
                                        <ProjectsAndFeaturesDisplay reload={props.reload} refresh={props.refresh} id={props.id} user={props.user}
                                            similarProjects={props.similarProjects} nonSimilarProjects={props.nonSimilarProjects} feature={feature} />
                                    </div>
                                    :
                                    <></>}
                            </div>
                        </div>
                        <hr className="mb-4"/>
                    </>
                ))}</>
        )
    }

    return (
        <div>
            <div className="row">
                <div className={"col-4"}>
                    {props.display && engineerCheck(props.user) ?
                        <AssociateExistingFeature project={props.id} existingIds={existingIds} reload={props.reload} refresh={props.refresh} />
                        : <></>}
                </div>
            </div>
            <div className="row mt-5">
                <div className="col overflow-table" id="accordion1">
                    {Object.keys(disciplines).map(discipline => (
                        <div className="card" key={discipline}>
                            <div className="card-header" id={`heading${discipline}1`}>
                                <h5 className="mb-0">
                                    <button className="btn collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse${discipline}1`}
                                        aria-expanded="false" aria-controls={`collapse${discipline}1`}>
                                        {discipline}
                                    </button>
                                </h5>
                            </div>
                            <div id={`collapse${discipline}1`} className="collapse" aria-labelledby={`heading${discipline}1`} data-bs-parent="#accordion1">
                                <div className="card-body">
                                    <Features features={disciplines[discipline]} reload={props.reload} refresh={props.refresh} similarProjects={props.similarProjects}
                                        nonSimilarProjects={props.nonSimilarProjects} user={props.user} id={props.id} action={props.action} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}