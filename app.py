import os
from helper import apology, db_init, dict_factory, create_users_table, get_user_position, check_assignment
from flask import Flask, redirect, render_template, request, session, url_for, jsonify
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
            return apology(title="INVALID ID", message="Your id must contain only 7 digits")
        elif len(password) < 6:
            return apology(title="INVALID PASSWORD", message="Your password must be longer than 5 characters")
        db = db_init()
        stored_user = db.execute("SELECT * FROM users WHERE id LIKE :id", {'id': user_id}).fetchone()

        if stored_user is None:
            return apology(title="INVALID ID", message="Wrong id" + user_id)

        if password != stored_user['password']:
            return apology(title="INVALID PASSWORD", message="Your id and password don't match")

        session["user_id"] = stored_user['id']
        session["user_permission"] = stored_user['permission']
        session["user_first_name"] = stored_user['first_name']
        session["user_last_name"] = stored_user['last_name']
        return url_for("index")

    else:
        return render_template('login.html')


@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')


@app.route('/search', methods=["GET", "POST"])  # TODO: //Login required
def search():
    if request.method == "POST":
        session['user_permission'] = 2  # TODO: REMOVE
        db = db_init()
        if request.form.__contains__("user_id"):
            user_id = request.form.get("user_id")
            return create_users_table(db.execute(
                "SELECT * FROM users WHERE id IS :id AND permission < :perm",
                {'id': user_id, 'perm': session['user_permission']}).fetchall())
        else:
            first_name = request.form.get("first_name")
            last_name = request.form.get("last_name")
            return create_users_table(db.execute(
                "SELECT * FROM users WHERE (first_name LIKE :first_name OR last_name LIKE :last_name) AND permission < :perm",
                {'first_name': first_name, 'last_name': last_name, 'perm': session['user_permission']}).fetchall())

    else:
        return render_template('search.html')


@app.route('/404')
def p404():
    return render_template('404.html', header=request.args.get("header"), title=request.args.get("title"),
                           message=request.args.get("message"))


@app.route('/profile', methods=["GET", "POST"])
def profile():
    session['user_id'] = 1000000  # TODO: REMOVE
    session['user_permission'] = 2  # TODO: REMOVE
    if request.method == "POST":
        try:
            old_user_id = int(request.form.get('old_user_id'))
            new_user_id = int(request.form.get('new_user_id'))
            permission = int(request.form.get('permission'))
            first_name = request.form.get('first_name')
            last_name = request.form.get('last_name')
            db = db_init()
            stored_user = db.execute("SELECT * FROM users WHERE id IS :id", {'id': old_user_id}).fetchone()
            if not stored_user['permission'] < session['user_permission'] or permission >= session['user_permission']:
                raise Exception('Permission Error')
            db.execute("UPDATE users SET first_name = :first_name, last_name = :last_name, id = :new_user_id, "
                       "permission = :permission WHERE id = :old_user_id",
                       {'first_name': first_name, 'last_name': last_name,
                        'new_user_id': new_user_id, 'old_user_id': old_user_id, 'permission': permission})
            db.commit()
            return jsonify({'success': True, 'name': first_name + " " + last_name, 'position': get_user_position(permission)})
        except:
            return jsonify({'success': False})

    else:
        if not request.args.__contains__("id"):
            user_id = session['user_id']
        else:
            user_id = request.args.get('id')
        db = db_init()
        stored_user = db.execute("SELECT * FROM users WHERE id IS :id", {'id': user_id}).fetchone()
        if stored_user is None:
            stored_user = db.execute("SELECT * FROM users WHERE id IS :id", {'id': session['user_id']}).fetchone()
        stored_user['position'] = get_user_position(stored_user['permission'])
        disabled = ('disabled', '')[session['user_permission'] > stored_user['permission']]
        return render_template("user.html", user=stored_user, disabled=disabled)


@app.route('/points', methods=["POST"])
def points():
    session['user_id'] = 1000000  # TODO: REMOVE
    session['user_permission'] = 2  # TODO: REMOVE
    try:
        to_user_id = int(request.form.get('to_user'))
        added_points = int(request.form.get('added_points'))
        set_assignment = request.form.get('assignment')
        assignment = check_assignment(set_assignment)
        db = db_init()
        stored_user = db.execute("SELECT * FROM users WHERE id IS :id", {'id': to_user_id}).fetchone()
        if not stored_user['permission'] < session['user_permission']:
            raise Exception('Permission Error')
        points = added_points + stored_user['points']
        db.execute("UPDATE users SET points = :points, assignment = :assignment WHERE id = :to_user_id",
                   {'points': points, 'assignment': assignment, 'to_user_id': to_user_id})
        db.commit()
        return jsonify({'success': True, 'points': points, 'assignment': str(assignment)})
    except:
        return jsonify({'success': False})


@app.route('/add_user', methods=["GET", "POST"])
def add_user():
    if request.method == "GET":
        return render_template('add_user.html')
    else:
        try:
            new_user_id = request.form.get('id').strip()
            first_name = request.form.get('first_name').strip()
            last_name = request.form.get('last_name').strip()
            if new_user_id.__len__() != 7 or first_name == "" or last_name == "":
                raise Exception("Invalid data")
            id = int(new_user_id)
            db = db_init()
            db.execute("INSERT into users (id, first_name, last_name) VALUES (:id, :first_name, :last_name)",
                       {'id': id, 'first_name': first_name, 'last_name': last_name})
            db.commit()
            return jsonify({'success': True, 'profile_link': url_for('profile', id=new_user_id)})
        except Exception as e:
            return jsonify({'success': False})
if __name__ == '__main__':
    app.run()
