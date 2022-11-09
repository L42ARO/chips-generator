# First part is just the builder
FROM golang:1.18.3-alpine AS builder
RUN mkdir /build
ADD go.mod go.sum main.go /build/
ADD pkg /build/pkg
WORKDIR /build
RUN go build

# Multistage docker:
FROM alpine
RUN adduser -S -D -H -h /app appuser
USER appuser
COPY --from=builder /build/chips-generator /app/
WORKDIR /app
CMD ["./chips-generator"]

#STEPS TO DEPLOY ON HEROKU:
#1. Git init the server
#2. heroku login
#3. heroku create-> Name the app
#4. heroku stack:set container
#5. Add the heroku.yml file and add the following
    # build:
    #   docker:
    #     web: Dockerfile
    # run:
    #   web: ./[app-name]
#6. Commit git -> git push heroku master