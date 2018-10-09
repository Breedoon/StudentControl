import os
import sqlite3
from helper import apology, db_init, dict_factory
from flask import Flask, redirect, render_template, request, session, url_for
from flask_jsglue import JSGlue

app = Flask(__name__)
jsglue = JSGlue(app)
app.secret_key = os.urandom(24)


@app.route('/')
def index():
    if not session.__contains__('user_id'):
        return redirect('/login')
    return redirect('/dashboard')


@app.route('/login', methods=["GET", "POST"])
def login():
    if request.method == "POST":
        session.clear()
        user_id = request.form.get("user_id")
        password = request.form.get("password")
        if not user_id or user_id.__len__() != 7 or not user_id.isdigit():
            return apology(title="INVALID ID", message="Your id must only contain 7 digits")
        elif len(password) < 6:
            return apology(title="INVALID PASSWORD", message="Your password must be longer than 5 characters")
        db = db_init()
        stored_user = db.execute("SELECT * FROM users WHERE id = :id", {'id': user_id}).fetchone()

        if stored_user is None:
            return apology(title="INVALID ID", message="Wrong id" + user_id)

        if password != stored_user['password']:
            return apology(title="INVALID PASSWORD", message="Your id and password don't match")

        session["user_id"] = stored_user['id']
        session["user_permission"] = stored_user['permission']
        session["user_name"] = stored_user['name']
        return url_for("index")

    else:
        return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/search', methods=["GET", "POST"])  # TODO: //Login required
def search():
    if request.method == "POST":
        if request.form.__contains__("user_id"):
            user_id = request.form.get("user_id")
            db = db_init()
            stored_users = db.execute("SELECT * FROM users WHERE id = :id AND permission < :perm", {'id': user_id, 'perm': session['user_permission']}).fetchall()
            return
        else:
            first_name = request.form.get("first_name")
            last_name = request.form.get("last_name")

    else:
        return render_template('search.html')


@app.route('/404')
def p404():
    return render_template('404.html', header=request.args.get("header"), title=request.args.get("title"), message=request.args.get("message"))


if __name__ == '__main__':
    app.run()
