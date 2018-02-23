from jinja2.utils import contextfunction
import pydash


@contextfunction
def _get(context, path, default=''):
    """
    Our _get implementation differs from lodash/pydash a bit.

    If we went the lodash route

     _get(quickshop, 'product.id')

    in the templates would fail if quickshop was undefined.

    So we've opted to go with

    _get('quickshop.product.id')

    and read straight from the context. This avoid something like
    {% if quickshop and _get(quickshop, 'product.id') %}

    """
    return pydash.get(context, path, default)


def _get_from_obj(obj, path, default=''):
    """
    Normal lodash implementation.

    Sometimes a variable is *not* available through the context in Jinja2

    Example:

        {% for i in l %}
            _get (...)
        {% endfor %}

        `i` is NOT available in the context unfortunately
    """
    return pydash.get(obj, path, default)
