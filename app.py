from flask import Flask, redirect, flash, request, url_for, session
from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = "ABCD1234"
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
CORS(app)
Session(app)

# CONNECT TO DB
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///books.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# CREATE TABLE
class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(250), unique=True, nullable=False)
    author = db.Column(db.String(250), nullable=False)
    rating = db.Column(db.Float, nullable=False)
    genre = db.Column(db.String(250), nullable=False)
    copies = db.Column(db.Integer)


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    password = db.Column(db.String(250), nullable=False)
    email = db.Column(db.String(250), unique=True, nullable=False)
    genre_issued = db.Column(db.String(250))


# db.create_all()


# def admin_only(f):
#     @wraps(f)
#     def decorated_function(*args, **kwargs):
#         try:
#             u_id = current_user.id
#         except AttributeError:
#             print("no user")
#             u_id = 0
#         if u_id == 0:
#             pass
#         elif u_id != 1:
#             return abort(403)
#         else:
#             return f(*args, **kwargs)
#
#     return decorated_function


def format_books(book):
    return {
        "id": book.id,
        "title": book.title,
        "author": book.author,
        "rating": book.rating,
        "genre": book.genre,
        "copies": book.copies
    }


@app.route('/')
def home():
    return {"Hello": "Hi"}


@app.route('/books')
def get_all_books():
    books = Book.query.all()
    book_list = []
    for book in books:
        book_list.append(format_books(book))
    return {"books": book_list}


@app.route('/add_book', methods=['POST'])
def add_book():
    if request.method == 'POST':
        new_book = Book(
            title=request.json['title'],
            author=request.json['author'],
            rating=request.json['rating'],
            genre=request.json['genre'],
            copies=int(request.json['copies']),
        )
        db.session.add(new_book)
        db.session.commit()
        return redirect(url_for("get_all_books"))


@app.route('/search_book', methods=['POST'])
def search_book():
    if request.method == 'POST':
        book = Book.query.filter_by(title=request.json['title']).first()
        if book:
            return format_books(book)
        else:
            flash("BOOK NOT FOUND", category="error")
            return {"error": "Book not found"}


@app.route('/edit_copies', methods=['PUT'])
def update_copies():
    book = Book.query.filter_by(title=request.json['title']).first()
    if book:
        book.copies = request.json['copies']
        db.session.commit()
        return redirect(url_for("get_all_books"))
    flash("BOOK NOT FOUND", category="error")
    return {"error": "BOOK NOT FOUND"}


@app.route('/issue_copies', methods=['PUT'])
def issue_copies():
    book = Book.query.filter_by(title=request.json['title']).first()
    if book:
        book.copies = int(book.copies) - int(request.json['copies'])
        if book.copies < 0:
            book.copies = 0
        db.session.commit()
        return redirect(url_for("get_all_books"))
    flash("BOOK NOT FOUND", category="error")
    return {"error": "BOOK NOT FOUND"}


@app.route('/delete', methods=["PUT"])
def delete_book():
    book = Book.query.filter_by(title=request.json['title']).first()
    if book:
        db.session.delete(book)
        db.session.commit()
        flash("BOOK DELETED SUCCESSFULLY", category="info")
        return redirect(url_for("get_all_books"))
    return {"error": "BOOK NOT FOUND"}


@app.route('/info')
def get_user():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        return {"id": user.id,
                "name": user.name,
                }, 200
    return {"error": "Unauthorized"}, 401


@app.route('/register', methods=["POST"])
def register_user():
    # print({request.json["name"], request.json["email"], request.json["password"]})
    new_user = User(
        name=request.json["name"],
        email=request.json["email"],
        password=request.json["password"]
    )
    user_exist = User.query.filter_by(email=request.json["email"]).first()

    if user_exist is not None:
        return {'error': 'user already exist'}, 409

    db.session.add(new_user)
    db.session.commit()
    session["user_id"] = new_user.id
    return {
        "id": new_user.id,
        "email": new_user.email,
        "Message": "you are Register Successfully"
    }


@app.route('/login', methods=["POST"])
def login_users():
    email = request.json["email"]
    password = request.json["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return {'error': 'Unauthorized '}, 401

    if not password == user.password:
        return {'error': 'Unauthorized '}, 401

    session["user_id"] = user.id

    return {
        "id": user.id,
        "email": user.email,
        "Message": "you are Successfully Logged In"
    }


@app.route('/logout', methods=["POST"])
def logout_user():
    session.pop("user_id")
    return "200"


# @login_manager.user_loader
# def load_user(user_id):
#     return User.query.get(int(user_id))


if __name__ == "__main__":
    app.run(debug=True)
