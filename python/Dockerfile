FROM python:3.11

WORKDIR /python

COPY requirements.txt .
COPY wait-for-keycloak.sh /usr/local/bin/wait-for-keycloak.sh

RUN chmod +x /usr/local/bin/wait-for-keycloak.sh
RUN pip install --no-cache-dir -r /python/requirements.txt

COPY . .

ENTRYPOINT ["/usr/local/bin/wait-for-keycloak.sh"]
