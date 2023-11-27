import { Link } from 'react-router-dom';
import SearchSiteModel from '../../../models/Site/SearchSiteModel';
export const SiteLogos: React.FC<{sites: SearchSiteModel[]}> = (props) =>{

    return(
        <div className={"container-fluid"}>
            <div className='row mt-5 h-100'>
                {props.sites.map(site =>(
                    <div className='d-flex col-2 col-lg-2 col-md-4 col-sm-6 logo-container'>
                        <Link to={{
                                pathname: `/site/${site.id}`,
                                state: {site: site}}}
                            style={{width: "100%"}}>

                            <div className="container-fluid h-100">
                                <div className="row justify-content-center h-100">
                                    <div className="col-12">
                                        <div className="h-100 d-flex flex-column">
                                            <div className="row justify-content-center text-center">
                                                <div className="text-white">
                                                    <div style={{height:"50px"}}><h3 className='text-warning site-name'>{site.name}</h3></div>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className={"col-12 text-center"}>
                                                        {site.logo !== null && site.logo !== undefined ?
                                                            <img src={require('../../../images/'+site.logo)} width={'150'} alt='logo' className={"center-block"}/>
                                                            :
                                                            <img src={require('../../../images/logo.png')} width={'150'}  alt='logo' className={"center-block"}/>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}