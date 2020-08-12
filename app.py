import os
from flask import Flask, jsonify, render_template, request, redirect, url_for
import flask
import json
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://sql9359913:fd31Rb65Ig''@sql9.freemysqlhosting.net/sql9359913'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

FILENAME = os.path.join(app.static_folder, "data", 'adfast4580.json')

from entities import Order


@app.route("/api/products")
def api_get_products():
    return jsonify(read_json_file(FILENAME)), 200


@app.route("/")
def index():
    json_data = read_json_file(FILENAME)
    template_dict = dict()
    for x in json_data["ColorWrapper"]:
        if x["nuanciers"]:
            if isinstance(x["nuanciers"]["ColorChartWrapper"], list):
                for y in x["nuanciers"]["ColorChartWrapper"]:
                    if y["tag_nuancier"] not in template_dict:
                        template_dict[y["tag_nuancier"]] = list()
                    template_dict.get(y["tag_nuancier"]).append(y)
            else:
                y = x["nuanciers"]["ColorChartWrapper"]
                if y["tag_nuancier"] not in template_dict:
                    template_dict[y["tag_nuancier"]] = list()
                template_dict.get(y["tag_nuancier"]).append(y)

    return render_template("main.html", prod_list=template_dict, json=json)


@app.route("/orders", methods=["GET", "POST"])
def orders_resource():
    if flask.request.method == "POST":
        fname = request.form["fname"]
        lname = request.form["lname"]
        prod_volume = request.form["prod-volume"]
        selected_product = list(json.loads(request.form["selected_product"]).keys())[0]
        selected_color_details = json.loads(request.form["selectedColor"])
        entity = Order(
            brand_name=selected_product,
            nuancier_delta=selected_color_details["nuancier_delta"],
            nuancier_ref_html=selected_color_details["nuancier_ref_html"],
            tag_nuancier_coul=selected_color_details["tag_nuancier_coul"],
            first_name=fname,
            last_name=lname,
            volume=prod_volume
        )
        db.session.add(entity)
        db.session.commit()
        return redirect(url_for('orders_resource'))

    orders = db.session.query(Order).all()
    return render_template("orders.html", order_list=orders, json=json)


def read_json_file(filename):
    with open(filename) as test_file:
        data = json.load(test_file)
    return data


if __name__ == '__main__':
    app.run()


