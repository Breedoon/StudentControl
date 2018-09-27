import os
import sqlite3
from flask import Flask, redirect, render_template, request, session, url_for
from flask_jsglue import JSGlue

app = Flask(__name__)
jsglue = JSGlue(app)
app.secret_key = os.urandom(24)


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def db_init():
    db = sqlite3.connect('SC')
    db.row_factory = dict_factory
    return db


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session.clear()
        user_id = request.form.get("user_id")
        password = request.form.get("password")
        if not user_id or user_id.__len__() != 7 or not user_id.isdigit():
            pass  # TODO: Invalid id
        elif len(password) < 6:
            pass  # TODO: Invalid password
        db = db_init()
        stored_user = db.execute("SELECT * FROM users WHERE id = :id", {'id': user_id}).fetchone()

        if not password != stored_user['password']:
            pass  # TODO: invalid password

        session["user_id"] = stored_user['id']
        return url_for("index")

    else:
        return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/search')
def search():
    return render_template('search.html')


@app.route('/')
def index():
    if not session.__contains__('user_id'):
        return redirect('/login')
    return redirect('/dashboard')


if __name__ == '__main__':
    app.run()
