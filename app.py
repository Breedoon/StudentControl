from flask import Flask, render_template, session
from flask_jsglue import JSGlue

app = Flask(__name__)
jsglue = JSGlue(app)

@app.route('/')
def index():
    if session.__contains__('user_id'):
        return render_template('dashboard.html')
    return render_template('login.html')


if __name__ == '__main__':
    app.run()
