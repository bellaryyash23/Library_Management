import React, {useState} from "react";
import axios from "axios";

function Delete(){

    const [title, setTitle] = useState("");
    const [foundBook, setBook] = useState({});
    const [updated, setUpdated] = useState(false);

    const handleTitleChange = e =>{
        setTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title);
        try {
            const book = await axios.post("http://localhost:5000/search_book", {"title": title});
            console.log(book.data);
            setBook(book.data);
            setTitle("");
            setUpdated(true);
            console.log(foundBook);
        } catch (err) {
            console.log(err.message);
        }

        try{
            const change = await axios.put("http://localhost:5000/delete", {"title": title});
            console.log(change.data);
        } catch (err) {
            console.log(err);
        }
        
    }

    return <div>
    {updated ?
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Book Deleted Successfully </h1>
            <a className="btn btn-warning btn-lg col col-lg-2 left-align font-weight-bold" href="/books" role="button">View</a>
        </div> :
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Delete Book</h1>
            <form className="col-md-6 row" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title" className="font-weight-bold ">Title of Book</label>
            <input onChange={handleTitleChange} type="text" name="title" className="form-control" id="title" value={title} />
            <small id="emailHelp" className="form-text text-muted">Enter title of book you want to delete.</small>
            <p></p>
            <button type="submit" className="btn btn-danger btn-lg font-weight-bold">Delete</button>
            </div>
            </form>
        </div>
    }
    </div>

}

export default Delete;