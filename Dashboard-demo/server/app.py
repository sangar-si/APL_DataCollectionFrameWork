from flask import Flask, jsonify

app = Flask(__name__)

# Mock data
data = {
    "sales": [
        {"month": "January", "value": 1000},
        {"month": "February", "value": 1500},
        {"month": "March", "value": 2000},
        {"month": "April", "value": 2500},
        {"month": "May", "value": 3000}
    ]
}

# Endpoint to fetch data
@app.route('/sales')
def get_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)