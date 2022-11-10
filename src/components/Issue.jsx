import React, {useState} from "react";
import axios from "axios";

function Issue(){
    const [title, setTitle] = useState("");
    const [copies, setCopies] = useState("");
    const [foundBook, setBook] = useState({});
    const [updated, setUpdated] = useState(false);

    const handleTitleChange = e =>{
        setTitle(e.target.value);
    }

    const handleCopiesChange = e =>{
        setCopies(e.target.value);
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
            const change = await axios.put("http://localhost:5000/issue_copies", 
            {"title": title, 
            "copies": copies
        });
            console.log(change.data);
            setCopies("");
        } catch (err) {
            console.log(err);
        }
        
    }

    return <div>
    {updated ?
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Book Issued Successfully </h1>
            <a className="btn btn-warning btn-lg col col-lg-2 left-align font-weight-bold" href="/books" role="button">Return</a>
        </div> :
        <div>
            <h1 className="display-3 text-danger font-weight-bold">Issue Book</h1>
            <form className="col-md-6 row" onSubmit={handleSubmit}>
            <div className="form-group">
            <label htmlFor="title" className="font-weight-bold ">Title of Book</label>
            <input onChange={handleTitleChange} type="text" name="title" className="form-control" id="title" value={title} />
            <small id="emailHelp" className="form-text text-muted">Enter title of book you're looking for.</small>
            <p></p>
            <label htmlFor="copies" className="font-weight-bold ">Number of Copies to Issue</label>
            <input onChange={handleCopiesChange} type="text" name="copies" className="form-control" id="copies" value={copies} />
            <small id="emailHelp" className="form-text text-muted">Enter number of copies to issue.</small>
            <p></p>
            <button type="submit" className="btn btn-warning btn-lg font-weight-bold">Issue</button>
            </div>
            </form>
        </div>
    }
    </div>
}

export default Issue;