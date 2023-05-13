import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const Checkout = () => {
   const {user} = useContext(AuthContext)
    const service = useLoaderData();
    const { title, _id, price, img } = service

    const handleBookService = event =>{
        event.preventDefault()
        const form = event.target;
        const name = form.name.value;
        const date = form.date.value;
        const email = form.email.value;
        const booking = {
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking);
        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.insertedId){
                alert("added successfully")
            }
        })
    }

    return (
        <div>
            <h2 className="text-center text-3xl
            ">Book your Service: {title}</h2>
            <div className="card-body">
                <form onSubmit={handleBookService}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" defaultValue={user?.displayName} className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Date</span>
                            </label>
                            <input type="date" name="date" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name='email' className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Amount</span>
                            </label>
                            <input type="text" name="price" defaultValue={'$'+ price} className="input input-bordered" />
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