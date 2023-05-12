import { useLoaderData } from "react-router-dom";

const Checkout = () => {

    const service = useLoaderData();
    const { title, _id } = service


    return (
        <div>
            <h2>Book your Service: {title}</h2>
            <div className="card-body">
                <form >
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" placeholder="password" className="input input-bordered" />
                        </div>
                    </div>
                    <div className="form-control mt-6">
                        <input type="submit" value="Order Confirm" className="btn btn-primary btn-block" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;