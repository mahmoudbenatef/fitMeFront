#build
FROM alpine
RUN apk add --update nodejs npm yarn
RUN addgroup -S reactgroup && adduser -S react -G reactgroup
USER react
RUN mkdir /home/react/code
WORKDIR /home/react/code
COPY  --chown=react:reactgroup package.json .
RUN ls
RUN yarn install  --network-timeout 100000
COPY . .
EXPOSE 3000
CMD npm run start


