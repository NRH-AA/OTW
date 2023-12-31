from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class House_List(db.Model, UserMixin):
    __tablename__ = 'house_lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    house_id = db.Column(db.Integer, primary_key=True)
    listid = db.Column(db.Integer, nullable=False)
    list = db.Column(db.Text, nullable=False)
    
    def to_dict(self):
        return {
            'id': self.id,
            'house_id': self.house_id,
            'listid': self.listid,
            'list': self.list
        }
