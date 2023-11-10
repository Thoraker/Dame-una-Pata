from uuid import uuid4


def get_uuid():
    """
    Generate a universally unique identifier (UUID) in hexadecimal format.

    :return: A string representing the UUID in hexadecimal format.
    """
    return uuid4().hex
