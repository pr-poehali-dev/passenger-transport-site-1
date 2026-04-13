"""
Бронирования пассажиров: получение списка, создание бронирования, отмена.
"""
import json
import os
import random
import string
import psycopg2

SCHEMA = "t_p33034807_passenger_transport_"

CORS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, X-Authorization",
}

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def get_user_id(cur, token: str):
    cur.execute(
        f"SELECT user_id FROM {SCHEMA}.sessions WHERE token = '{token}' AND expires_at > NOW()"
    )
    row = cur.fetchone()
    return row[0] if row else None

def gen_code() -> str:
    return "BK-" + "".join(random.choices(string.digits, k=4))

def handler(event: dict, context) -> dict:
    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": CORS, "body": ""}

    path = event.get("path", "/")
    method = event.get("httpMethod", "GET")
    headers_resp = {**CORS, "Content-Type": "application/json"}

    token = event.get("headers", {}).get("X-Authorization", "").replace("Bearer ", "")
    if not token:
        return {"statusCode": 401, "headers": headers_resp, "body": json.dumps({"error": "Требуется авторизация"})}

    conn = get_conn()
    cur = conn.cursor()
    user_id = get_user_id(cur, token)
    if not user_id:
        conn.close()
        return {"statusCode": 401, "headers": headers_resp, "body": json.dumps({"error": "Сессия истекла"})}

    # GET / — список бронирований
    if method == "GET":
        cur.execute(
            f"SELECT id, booking_code, route_from, route_to, departure_date, departure_time, arrival_time, seat, bus_id, price, status, created_at FROM {SCHEMA}.bookings WHERE user_id = {user_id} ORDER BY created_at DESC"
        )
        rows = cur.fetchall()
        conn.close()
        result = [
            {
                "id": r[0], "booking_code": r[1], "route_from": r[2], "route_to": r[3],
                "departure_date": r[4], "departure_time": r[5], "arrival_time": r[6],
                "seat": r[7], "bus_id": r[8], "price": r[9], "status": r[10],
                "created_at": r[11].isoformat() if r[11] else None
            }
            for r in rows
        ]
        return {"statusCode": 200, "headers": headers_resp, "body": json.dumps(result, ensure_ascii=False)}

    # POST /create — создать бронирование
    if method == "POST" and path.endswith("/create"):
        body = json.loads(event.get("body") or "{}")
        required = ["route_from", "route_to", "departure_date", "departure_time", "arrival_time", "seat", "bus_id", "price"]
        for f in required:
            if not body.get(f):
                conn.close()
                return {"statusCode": 400, "headers": headers_resp, "body": json.dumps({"error": f"Поле {f} обязательно"})}

        code = gen_code()
        cur.execute(
            f"INSERT INTO {SCHEMA}.bookings (user_id, booking_code, route_from, route_to, departure_date, departure_time, arrival_time, seat, bus_id, price) VALUES ({user_id}, '{code}', '{body['route_from']}', '{body['route_to']}', '{body['departure_date']}', '{body['departure_time']}', '{body['arrival_time']}', '{body['seat']}', '{body['bus_id']}', {int(body['price'])}) RETURNING id, booking_code"
        )
        row = cur.fetchone()
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": headers_resp,
                "body": json.dumps({"id": row[0], "booking_code": row[1]}, ensure_ascii=False)}

    # POST /cancel — отменить бронирование
    if method == "POST" and path.endswith("/cancel"):
        body = json.loads(event.get("body") or "{}")
        booking_id = body.get("booking_id")
        if not booking_id:
            conn.close()
            return {"statusCode": 400, "headers": headers_resp, "body": json.dumps({"error": "booking_id обязателен"})}

        cur.execute(
            f"UPDATE {SCHEMA}.bookings SET status = 'cancelled' WHERE id = {int(booking_id)} AND user_id = {user_id} AND status = 'active'"
        )
        conn.commit()
        conn.close()
        return {"statusCode": 200, "headers": headers_resp, "body": json.dumps({"ok": True})}

    conn.close()
    return {"statusCode": 404, "headers": headers_resp, "body": json.dumps({"error": "Not found"})}
