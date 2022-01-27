import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Main = (props) => {


    const [authors, setAuthors] = useState([])
    const [load, setload] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:8000/api/authors")
            .then(res => {
                console.log(res.data)
                setAuthors(res.data)
                setload(true);
            }
            )
            .catch(err => console.log(err))
    }, []);

    const deleteAuthor = (deleteId) => {
        // console.log(deleteId);
        axios.delete("http://localhost:8000/api/authors/" + deleteId)
            .then(res => {
                console.log(res.data);
                console.log("SUCCESS DELETE!");

                // remove from DOM after delete success
                setAuthors(authors.filter((author) => author._id !== deleteId))
            })
            .catch(err => console.log(err))
    }


    return (
        <div >
            <h3>Favourite Authors!</h3>
            <h5>
                <Link to={"/author/create/"}>Add an Author </Link>
            </h5>
           

                {
                    authors.map((author, idx) => {

                        return (
                            <div key={author._id} >

                                
                                        {author.name}
                                        
                                        <Link to={"/author/update/" + author._id}>Edit </Link>
                                            <button onClick={() => deleteAuthor(author._id)}>delete</button>
                                    
                                    
                            </div>
                        )

                    })
                }
              
        </div>

    )
};

export default Main;





