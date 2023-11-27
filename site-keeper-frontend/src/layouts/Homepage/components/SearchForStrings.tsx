import { useState } from "react";
import SearchSiteModel from "../../../models/Site/SearchSiteModel";
import StringSearchCard from "../../../models/UtilModels/StringSearchCard";
import { stringSearch } from "../../Utils/TsFunctions";
import { Link } from "react-router-dom";

export const SearchForStrings: React.FC<{ sites: SearchSiteModel[] }> = (props) => {
    
    const [search, setSearch] = useState('')
    const [cards, setCards] = useState<StringSearchCard[]>([])

    function findStrings() {
        if(search === '' || search === ' '){
            setCards([])
        }
        else{
            setCards(stringSearch(props.sites, search))
        }
        
    }


    return (
        <>
            <div className="row mt-3">
                <div className="col col-9">
                    <input type="text" className="form-control" placeholder="Search Sites"
                        aira-label='start date' onChange={e => setSearch(e.target.value)} value={search} />

                </div>
                <div className="col col-3">
                <button className="btn btn-primary" onClick={() => findStrings()}>search</button>
                </div>
            </div>
            <div className="mt-3">
            {cards.map(card => (
                <div className="card mb-2">
                    <div className="card-body">
                        <Link to={card.linkToFollow}><h5 className="card-title">{card.title}</h5></Link>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{card.type}</h6>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{card.tag}</h6>
                        <p>{card.description}</p>
                    </div>
                </div>
            ))}
            </div>
        </>
    )
}