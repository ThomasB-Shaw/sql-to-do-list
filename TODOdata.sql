CREATE TABLE "tasks" (
"id" serial primary key,
"task" varchar(200),
"status" boolean default false
);

INSERT INTO "tasks" ("task")
VALUES ('Make bed');

INSERT INTO "tasks" ("task")
VALUES ('Play Gloomhaven');

INSERT INTO "tasks" ("task")
VALUES ('Update budget Excel Sheet');