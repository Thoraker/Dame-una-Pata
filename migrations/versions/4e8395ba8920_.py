"""empty message

Revision ID: 4e8395ba8920
Revises: 8e49d3d72942
Create Date: 2024-03-12 22:35:38.730102

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '4e8395ba8920'
down_revision = '8e49d3d72942'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('message', sa.String(length=250), nullable=True))
        batch_op.drop_column('description')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('pets', schema=None) as batch_op:
        batch_op.add_column(sa.Column('description', sa.VARCHAR(length=250), autoincrement=False, nullable=True))
        batch_op.drop_column('message')

    # ### end Alembic commands ###