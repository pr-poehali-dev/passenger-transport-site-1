"""
Авторизация пассажиров: регистрация, вход, выход, проверка сессии.
"""
import json
import os
import hashlib
import secrets
import psycopg2
from datetime import datetime, timedelta

SCHEMA = "t_p33034807_passenger_transport_"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def make_token() -> str:
    return secrets.token_hex(32)

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    path = event.get("path", "/")
    method = event.get("httpMethod", "GET")
    body = {}
    if event.get("body"):
        body = json.loads(event["body"])

    headers = {**CORS, "Content-Type": "application/json"}

    # POST /register
    if method == "POST" and path.endswith("/register"):
        name = body.get("name", "").strip()
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")
        phone = body.get("phone", "").strip()

        if not name or not email or not password:
            return {"statusCode": 400, "headers": headers,
                    "body": json.dumps({"error": "Заполните все обязательные поля"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = '{email}'")
        if cur.fetchone():
            conn.close()
            return {"statusCode": 409, "headers": headers,
                    "body": json.dumps({"error": "Email уже зарегистрирован"})}

        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (name, email, password_hash, phone) VALUES ('{name}', '{email}', '{pw_hash}', '{phone}') RETURNING id"
        )
        user_id = cur.fetchone()[0]

        token = make_token()
        expires = (datetime.now() + timedelta(days=30)).isoformat()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at) VALUES ({user_id}, '{token}', '{expires}')"
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"token": token, "user": {"id": user_id, "name": name, "email": email, "phone": phone}})}

    # POST /login
    if method == "POST" and path.endswith("/login"):
        email = body.get("email", "").strip().lower()
        password = body.get("password", "")

        conn = get_conn()
        cur = conn.cursor()
        pw_hash = hash_password(password)
        cur.execute(
            f"SELECT id, name, email, phone FROM {SCHEMA}.users WHERE email = '{email}' AND password_hash = '{pw_hash}'"
        )
        row = cur.fetchone()
        if not row:
            conn.close()
            return {"statusCode": 401, "headers": headers,
                    "body": json.dumps({"error": "Неверный email или пароль"})}

        user_id, name, user_email, phone = row
        token = make_token()
        expires = (datetime.now() + timedelta(days=30)).isoformat()
        cur.execute(
            f"INSERT INTO {SCHEMA}.sessions (user_id, token, expires_at) VALUES ({user_id}, '{token}', '{expires}')"
        )
        conn.commit()
        conn.close()

        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"token": token, "user": {"id": user_id, "name": name, "email": user_email, "phone": phone or ""}})}

    # GET /me
    if method == "GET" and path.endswith("/me"):
        token = event.get("headers", {}).get("X-Authorization", "").replace("Bearer ", "")
        if not token:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Нет токена"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(
            f"SELECT u.id, u.name, u.email, u.phone FROM {SCHEMA}.sessions s JOIN {SCHEMA}.users u ON s.user_id = u.id WHERE s.token = '{token}' AND s.expires_at > NOW()"
        )
        row = cur.fetchone()
        conn.close()
        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Сессия истекла"})}

        user_id, name, email, phone = row
        return {"statusCode": 200, "headers": headers,
                "body": json.dumps({"user": {"id": user_id, "name": name, "email": email, "phone": phone or ""}})}

    # POST /logout
    if method == "POST" and path.endswith("/logout"):
        token = event.get("headers", {}).get("X-Authorization", "").replace("Bearer ", "")
        if token:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"UPDATE {SCHEMA}.sessions SET expires_at = NOW() WHERE token = '{token}'")
            conn.commit()
            conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    # POST /update-profile
    if method == "POST" and path.endswith("/update-profile"):
        token = event.get("headers", {}).get("X-Authorization", "").replace("Bearer ", "")
        if not token:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Нет токена"})}

        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT user_id FROM {SCHEMA}.sessions WHERE token = '{token}' AND expires_at > NOW()")
        row = cur.fetchone()
        if not row:
            conn.close()
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Сессия истекла"})}

        user_id = row[0]
        name = body.get("name", "").strip()
        phone = body.get("phone", "").strip()
        cur.execute(f"UPDATE {SCHEMA}.users SET name = '{name}', phone = '{phone}' WHERE id = {user_id}")
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"ok": True})}

    return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Not found"})}
