from __future__ import annotations

from datetime import datetime, timedelta, timezone
import hashlib
import hmac
import re
import secrets


PBKDF2_ITERATIONS = 310_000
PASSWORD_RULE = re.compile(r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\*).{10,128}$")
USERNAME_RULE = re.compile(r"^[A-Za-z0-9_.-]{3,32}$")


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def iso_now() -> str:
    return utc_now().isoformat(timespec="seconds")


def validate_username(username: str) -> str:
    value = username.strip()
    if not USERNAME_RULE.fullmatch(value):
        raise ValueError("Username must be 3-32 characters using letters, numbers, dot, dash or underscore.")
    return value


def validate_password(password: str) -> None:
    if not PASSWORD_RULE.fullmatch(password):
        raise ValueError("Password must be at least 10 characters and include lowercase, uppercase, a number and *.")


def hash_password(password: str) -> str:
    validate_password(password)
    salt = secrets.token_bytes(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode("utf-8"), salt, PBKDF2_ITERATIONS)
    return f"pbkdf2_sha256${PBKDF2_ITERATIONS}${salt.hex()}${digest.hex()}"


def verify_password(password: str, encoded: str) -> bool:
    try:
        algorithm, iterations, salt_hex, expected_hex = encoded.split("$", 3)
        if algorithm != "pbkdf2_sha256":
            return False
        digest = hashlib.pbkdf2_hmac(
            "sha256",
            password.encode("utf-8"),
            bytes.fromhex(salt_hex),
            int(iterations),
        )
        return hmac.compare_digest(digest.hex(), expected_hex)
    except (TypeError, ValueError):
        return False


def new_token() -> str:
    return secrets.token_urlsafe(40)


def token_hash(token: str) -> str:
    return hashlib.sha256(token.encode("utf-8")).hexdigest()


def expiry_iso(hours: int) -> str:
    return (utc_now() + timedelta(hours=hours)).isoformat(timespec="seconds")