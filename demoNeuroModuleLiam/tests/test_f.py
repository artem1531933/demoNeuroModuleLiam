import pytest
import sys
sys.path.append("..")

import random
from demoNeuroModuleLiam.dMLiam.api import *


def test_divider():
    assert divider(1, 1) == 1 // 1
    assert divider(5, 8) == 5 // 8


def test_multi():
    assert multiply(1, 5) == 1 * 5
    assert multiply(0, 3) == 0 * 3


def test_divider_exceptions():
    with pytest.raises(ZeroDivisionError):
        divider(3, 0)


def test_random_data():
    for i in range(10):
        a = random.randint(-100, 200)
        b = random.randint(-100, 200)
        assert divider(a, b) == a // b
        assert multiply(a, b) == a * b