import sqlite3

from flask import url_for, render_template


def apology(header="ERROR", title="404 — NOTHING WAS FOUND",
            message='The page you are looking for might have been removed had its name changed or is temporarily '
                    'unavailable. '):
    return url_for("p404", header=header, title=title, message=message + ". ")


def dict_factory(cursor, row):
    d = {}
    for idx, col in enumerate(cursor.description):
        d[col[0]] = row[idx]
    return d


def db_init():
    db = sqlite3.connect('SC')
    db.row_factory = dict_factory
    return db


def create_users_table(users):
    table = dict()
    table['head'] = ["Name", "ID", "Type", "Points", "Current assignment"]
    table['rows'] = []
    for user in users:
        type = "Student"
        if user['permission'] is 1:
            type = 'Teacher'
        elif user['permission'] is 2:
            type = "Admin"
        table['rows'].append([user['first_name'] + " " + user['last_name'], user['id'], type, user['points'], user['assigned_to']])
    return render_template("table.html", table=table)