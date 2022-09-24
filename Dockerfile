FROM python:3.10-alpine3.15

ENV PYTHONUNBUFFERED 1

WORKDIR /app

# install psycopg2 dependencies
RUN apk update \
    && apk add postgresql-dev gcc python3-dev musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .

# entrypoint
ENTRYPOINT ["sh", "./entrypoint.sh"]