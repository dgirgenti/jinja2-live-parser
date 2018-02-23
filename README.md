# Jinja2 & Nunjucks sandbox

_(forked from [qn7o/jinja2-live-parser](https://github.com/qn7o/jinja2-live-parser))_

A lightweight sandbox for [Jinja2](http://jinja.pocoo.org/docs/dev/) and [Nunjucks](https://mozilla.github.io/nunjucks/templating.html) to test that your templates & filters are compliant with both syntaxes. All you need is Python, [pip](https://pypi.python.org/pypi/pip), and a web browser. Developed with Python 2.7 (I have not verified Python 3 support). Can parse JSON and YAML inputs.

## TODOs

* virtualenv so you're not `pip install`ing everything globally lol
* pull js filters out of `convert.js`
* Node/NPM + Webpack instead of barebones js/jquery
* pull more js/py filters from existing repos
* live updating on change of template textarea

## Install

### Clone + pip

    $ git clone git@github.com:dgirgenti/jinja2-nunjucks-sandbox.git
    $ cd jinja2-nunjucks-sandbox
    $ pip install -r requirements.txt  # TODO: don't install globally, sorry
    $ python parser.py

### Dockerfile (I personally have not verified this yet)

Build it:

    docker build -t mydocker/j2parser .
    docker run -d -p 5000:5000 mydocker/j2parser


## Usage

You are all set, go to `http://localhost:5000/` and have fun.  
You can add any custom filter you'd like in `filters.py` and `convert.js` (for now).


## Preview

![preview](https://i.imgur.com/uR0Yswg.png)
