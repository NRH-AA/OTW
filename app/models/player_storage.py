from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Player_Storage(db.Model, UserMixin):
    __tablename__ = 'player_storage'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
        
    player_id = db.Column(db.Integer, nullable=False, default=0)
    key = db.Column(db.Integer, unsigned=True, nullable=False, default=0)
    value = db.Column(db.Integer, nullable=False, default=0)
    
    def to_dict(self):
        return {
            'player_id': self.player_id,
            'key': self.key,
            'value': self.value
        }