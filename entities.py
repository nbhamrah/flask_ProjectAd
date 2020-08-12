import arrow
from app import app, db


class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_date_time = db.Column(db.DateTime, default=lambda: arrow.utcnow().datetime)
    brand_name = db.Column(db.String(80))
    nuancier_delta = db.Column(db.String(80))
    nuancier_ref_html = db.Column(db.String(80))
    tag_nuancier_coul = db.Column(db.String(80))
    first_name = db.Column(db.String(80))
    last_name = db.Column(db.String(80))
    volume = db.Column(db.Float)

    def __init__(self, brand_name, nuancier_delta, nuancier_ref_html, tag_nuancier_coul, first_name, last_name, volume):
        self.brand_name = brand_name
        self.nuancier_delta = nuancier_delta
        self.nuancier_ref_html = nuancier_ref_html
        self.tag_nuancier_coul = tag_nuancier_coul
        self.first_name = first_name
        self.last_name = last_name
        self.volume = volume
