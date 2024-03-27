"""empty message

Revision ID: 5524f919f082
Revises: b395f8f42a3c
Create Date: 2024-03-22 11:11:29.736545

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5524f919f082'
down_revision = 'b395f8f42a3c'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('addresses', schema=None) as batch_op:
        batch_op.drop_column('city')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('addresses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('city', sa.INTEGER(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###