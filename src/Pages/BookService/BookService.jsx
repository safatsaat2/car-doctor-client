import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import BookServiceRow from "./BookServiceRow";

const BookService = () => {

    const { user } = useContext(AuthContext);
    console.log(user?.email);
    const [booking, setBooking] = useState([])

    console.log(booking)


    const url = `http://localhost:5000/bookings?email=${user?.email}`;
    useEffect(() => {
        try {
            fetch(url)
                .then((res => res.json()))
                .then(data => {
                    setBooking(data);
                })
        }
        catch {
            err => console.log(err)
        }
    }, [])

    const handleDelete = id =>{
        const proceed = confirm('Are You sure you want to delete?');
        if(proceed){
            fetch(`http://localhost:5000/bookings/${id}`, {method:'DELETE'})
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
                          booking.map(book => <BookServiceRow key={book._id} book={book} handleDelete={handleDelete}></BookServiceRow>)  

                        }
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default BookService;