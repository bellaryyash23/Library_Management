import React, {useState} from "react";
import axios from "axios";

function Search() {

    const [bookFound, setFound] = useState(false);
    const [title, setTitle] = useState("");
    const [foundBook, setBook] = useState({});

    const handleChange = e =>{
        setTitle(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title);
        try {
            const book = await axios.post("http://localhost:5000/search_book", {"title": title});
            console.log(book.data);
            setBook(book.data);
            setFound(true);
            setTitle("");
        } catch (err) {
            console.log(err.message);
        }
        
    }

    return <div>
            <h1 className="display-3 text-danger font-weight-bold">Search Book</h1>
            <form className="col-md-6 row" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title" className="font-weight-bold ">Title of Book</label>
            <input onChange={handleChange} type="text" name="title" className="form-control" id="title" value={title} />
            <small id="emailHelp" className="form-text text-muted">Enter title of book you're looking for.</small>
            <p></p>
            <button type="submit" className="btn btn-warning btn-lg font-weight-bold">Search</button>
            </div>
            </form>
            <br></br>
            {bookFound && <div>
            <h3 className="font-weight-bold">Book Found</h3>
                <ul className="list-group">
                    <li className="list-group-item list-group-item-action list-group-item-dark">Title: {foundBook.title}</li>
                    <li className="list-group-item list-group-item-action list-group-item-dark">Author: {foundBook.author}</li>
                    <li className="list-group-item list-group-item-action list-group-item-dark">Genre: {foundBook.genre}</li>
                    <li className="list-group-item list-group-item-action list-group-item-dark">Rating: {foundBook.rating}/5</li>
                    <li className="list-group-item list-group-item-action list-group-item-dark">Copies Available: {foundBook.copies}</li>
                </ul>
            <p></p>
            <a className="btn btn-warning btn-lg left-align font-weight-bold" href="/books" role="button">Return</a>
            </div>
            }
    </div>

}

export default Search;