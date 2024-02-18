"""empty message

Revision ID: 2c9adcd14291
Revises: 
Create Date: 2024-02-13 00:07:50.243815

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2c9adcd14291'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('pets',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=True),
    sa.Column('specie', sa.Integer(), nullable=True),
    sa.Column('size', sa.Integer(), nullable=True),
    sa.Column('age', sa.Integer(), nullable=True),
    sa.Column('description', sa.String(length=250), nullable=True),
    sa.Column('is_active', sa.Boolean(), nullable=True),
    sa.Column('for_adoption', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('name', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=250), nullable=False),
    sa.Column('password', sa.String(length=250), nullable=False),
    sa.Column('first_name', sa.String(length=150), nullable=False),
    sa.Column('last_name', sa.String(length=250), nullable=False),
    sa.Column('avatar', sa.String(length=250), nullable=True),
    sa.Column('active', sa.Boolean(), nullable=True),
    sa.Column('is_admin', sa.Boolean(), nullable=True),
    sa.Column('is_superuser', sa.Boolean(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('name')
    )
    op.create_table('addresses',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('street', sa.String(length=80), nullable=True),
    sa.Column('number', sa.Integer(), nullable=True),
    sa.Column('department', sa.Integer(), nullable=True),
    sa.Column('region', sa.Integer(), nullable=True),
    sa.Column('city', sa.Integer(), nullable=True),
    sa.Column('commune', sa.Integer(), nullable=True),
    sa.Column('owner_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('owners_pets',
    sa.Column('owner_id', sa.String(), nullable=True),
    sa.Column('pet_id', sa.String(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], )
    )
    op.create_table('photos',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('url', sa.String(length=250), nullable=True),
    sa.Column('pet_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('posts',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('reference_post_id', sa.Integer(), nullable=True),
    sa.Column('message', sa.String(length=500), nullable=False),
    sa.Column('pet_id', sa.String(), nullable=True),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['pet_id'], ['pets.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('posts')
    op.drop_table('photos')
    op.drop_table('owners_pets')
    op.drop_table('addresses')
    op.drop_table('users')
    op.drop_table('pets')
    # ### end Alembic commands ###