import React, {useState} from "react";
import axios from "axios";

function Add(){

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState("");
    const [rating, setRating] = useState("");
    const [copies, setCopies] = useState("");
    const [book, addbook] = useState(false);

    const handleTitleChange = e =>{
        setTitle(e.target.value);
    }

    const handleAuthorChange = e =>{
        setAuthor(e.target.value);
    }

    const handleGenreChange = e =>{
        setGenre(e.target.value);
    }

    const handleRatingChange = e =>{
        setRating(e.target.value);
    }

    const handleCopiesChange = e =>{
        setCopies(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(title);
        try {
            const book = await axios.post("http://localhost:5000/add_book", 
            {"title": title,
             "author": author,
             "genre": genre,
             "rating": rating,
             "copies": copies
        });
            console.log(book.data);
            setTitle("");
            setAuthor("");
            setGenre("");
            setRating("");
            setCopies("");
            addbook(true);
        } catch (err) {
            console.log(err.message);
        }
        
    }

    return <div>
    {book ? 
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Book Added Successfully </h1>
            <a className="btn btn-warning btn-lg col col-lg-2 left-align font-weight-bold" href="/books" role="button">View</a>
        </div> :     
        <div>
        <h1 className="display-3 text-danger font-weight-bold">Add Book</h1>
            <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title" className="font-weight-bold ">Title of Book</label>
            <input onChange={handleTitleChange} type="text" name="title" className="form-control" id="title" value={title} />
            <small id="emailHelp" className="form-text text-muted">Enter title of the book</small>

            <label htmlFor="title" className="font-weight-bold ">Author of Book</label>
            <input onChange={handleAuthorChange} type="text" name="author" className="form-control" id="author" value={author} />
            <small id="emailHelp" className="form-text text-muted">Enter author of the book</small>

            <label htmlFor="title" className="font-weight-bold ">Genre of Book</label>
            <input onChange={handleGenreChange} type="text" name="genre" className="form-control" id="genre" value={genre} />
            <small id="emailHelp" className="form-text text-muted">Enter genre of the book</small>

            <label htmlFor="title" className="font-weight-bold ">Rating: </label>
            <input onChange={handleRatingChange} type="text" name="rating" className="form-control" id="rating" value={rating} />
            <small id="emailHelp" className="form-text text-muted">Enter rating of the book</small>

            <label htmlFor="title" className="font-weight-bold ">Available Copies: </label>
            <input onChange={handleCopiesChange} type="text" name="copies" className="form-control" id="copies" value={copies} />
            <small id="emailHelp" className="form-text text-muted">Available copies of Books</small>

            <p></p>
            <button type="submit" className="btn btn-warning btn-lg col font-weight-bold">Add</button>
            </div>
            </form>
        </div>  
    }
    </div>

}

export default Add;