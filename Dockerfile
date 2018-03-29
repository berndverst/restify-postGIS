FROM node:alpine

RUN apk add --update \
    python2 \
    python2-dev \
    build-base \
  && rm -rf /var/cache/apk/*

COPY . /

RUN npm install --unsafe-perm

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["start"]
