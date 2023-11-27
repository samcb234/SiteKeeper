export const UplaodRepositoryPage = () => { //this will become a React.FC b/c project name is needed

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm justify-content-start mt-3">
                    <h4 className="text-warning font-weight-bold">Project Name</h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg">
                    <div className="card text-bg-warning mt-3">
                        <div className="card-body">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Repository" aria-label="Username" aria-describedby="basic-addon1" />
                                <button className="btn btn-primary">Add Repository</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}