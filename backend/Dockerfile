# ==========================
# 1️⃣ Builder Stage
# ==========================
FROM python:3.13-slim AS builder

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

# Copy Pipenv files explicitly
COPY Pipfile Pipfile.lock ./

# Make sure Pipfile exists before locking
RUN ls -al && cat Pipfile

# Install pipenv and export requirements.txt safely
RUN pip install --upgrade pip && pip install pipenv \
 && pipenv install --deploy --ignore-pipfile \
 && pipenv requirements > requirements.txt
# ↑ newer syntax; safer than `pipenv lock -r`

# ==========================
# 2️⃣ Runtime Stage
# ==========================
FROM python:3.12-slim AS runtime

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq-dev \
 && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

COPY . .

EXPOSE 8008

CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && gunicorn backend.wsgi:application --bind 0.0.0.0:8008 --workers 3 --timeout 60"]