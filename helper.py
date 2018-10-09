import sqlite3

from flask import url_for


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

def create_table(users):
    return """"""