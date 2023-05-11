from setuptools import setup, find_packages

import json
import os

# def read_pipenv_dependencies(fname):
#     filepath = os.path.join(os.path.dirname(__file__), fname)
#     with open(filepath) as lockfile:
#         lockjson = json.load(lockfile)
#         return [dependency for dependency in lockjson.get('default')]

if __name__ == '__main__':
    setup(
        name='dMLiam',
        version=os.getenv('PACKAGE_VERSION', '0.0.dev0'),
        package_dir={'': 'dMLiam'},
        packages=find_packages('dMLiam', include=[
            '*'
        ]),
        description='dm',
        install_requires=["attrs==22.1.0", "colorama==0.4.6", "pytest==7.2.0", "pluggy==1.0.0"]
    )