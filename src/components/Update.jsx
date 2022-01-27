import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Update = (props) => {
    const [authors, setAuthors] = useState({});
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState("");
    const [quotes, setQuotes] = useState("");

    const [errors, setErrors] = useState([]);
    const history = useHistory();
    const { id } = useParams();
    console.log("inside update");

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors/" + id)
            .then(res => {
                setAuthors(res.data);
                console.log(res.data);

                setLoaded(true);
            })
            .catch(err => console.log(err))
    }, [])

    const update = (e) => {
        e.preventDefault();

        const newAuthor = {
            name: name,
            quotes: quotes,

        }

        // POST to the db, with the obj created
        axios.put("http://localhost:8000/api/authors/" + id, newAuthor)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS writing to the DB!!");
                history.push("/")
            })
            .catch(err => {
                console.log("ERROR!!!");
                console.log(err.response.data);
                const errorResponse = err.response.data.errors; // Get the errors from err.response.data
                const errorArr = [];       // Define a temp error array to push the messages in
                for (const key of Object.keys(errorResponse)) { // Loop through all errors and get the messages
                    errorArr.push(errorResponse[key].message)
                }
                // Set Errors
                setErrors(errorArr);
            })
    }

    const CancelHandler = e => {

        e.preventDefault();
        history.push("/")

    }

    return (
        <div>
            <h3>Favourite Authors!</h3>
            <Link to="/">home</Link>
            {loaded ?
                <form onSubmit={update}>
                    <div>

                        {errors.map((err, index) => <p style={{ color: "red" }} key={index}>{err}</p>)}
                        <p>
                            <label>Name</label><br />
                            <input type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder={authors.Author.name} />

                        </p>
                        <p>
                            <label>Quotes</label><br />
                            <input type="text" onChange={(e) => setQuotes(e.target.value)} value={quotes} placeholder={authors.Author.quotes} />
                        </p>
                        <button >Submit</button>

                        <button onClick={CancelHandler}>Cancel</button>


                    </div>


                </form>
                : <p>loading</p>
            }
        </div>
    );
}

export default Update;


