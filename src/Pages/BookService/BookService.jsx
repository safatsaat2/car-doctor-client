import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookServiceRow from "./BookServiceRow";
import { useNavigate } from "react-router-dom";

const BookService = () => {

    const { user } = useContext(AuthContext);
    const [booking, setBooking] = useState([])
    const navigate = useNavigate()
    console.log(booking)


    const url = `https://car-doctor-server-three-ochre.vercel.app/bookings?email=${user?.email}`;
    useEffect(() => {

            fetch(url, {
                method: "GET",
                headers: {
                    authorization: `Bearer ${localStorage.getItem('car-access-token')}`
                }
            })
                .then((res => res.json()))
                .then(data => {
                    if(!data.error){
                        setBooking(data);
                    }
                    else{
                        navigate('/')
                    }
                })

    }, [url])

    const handleDelete = id =>{
        const proceed = confirm('Are You sure you want to delete?');
        if(proceed){
            fetch(`https://car-doctor-server-three-ochre.vercel.app/bookings/${id}`, {method:'DELETE'})
            .then(res => res.json())
            .then(data => {console.log(data);
            if(data.deletedCount > 0){
                alert('deleted Successful')

                const remaining = booking.filter(book => book._id !== id);
                setBooking(remaining)
            }
            
            })
        }
    }

   const handleConfirm = id => {
        fetch(`https://car-doctor-server-three-ochre.vercel.app/bookings/${id}`,{
            method:"PATCH",
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({status:'confirm'})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                // updated
                const remaining = booking.filter(book => book._id !== id);
                const updated = booking.find(book => book._id === id);
                updated.status = 'confirm'
                const newBookings = [updated, ...remaining];
                setBooking(newBookings);

            }
        })
    }


    return (
        <div>
            <h2 className="text-5xl font-bold text-center mb-4">Your Bookings: {booking.length}</h2>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    
                                </label>
                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Add</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                          booking.map(book => <BookServiceRow key={book._id} book={book} handleDelete={handleDelete} handleConfirm={handleConfirm}></BookServiceRow>)  

                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default BookService;