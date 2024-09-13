FROM python:3.11

WORKDIR /geo

COPY requirements.txt .

RUN pip install --no-cache-dir -r /geo/requirements.txt

COPY . .

CMD ["fastapi", "run", "main.py"]