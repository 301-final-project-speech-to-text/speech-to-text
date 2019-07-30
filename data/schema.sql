DROP TABLE IF EXISTS lang CASCADE;
DROP TABLE IF EXISTS trans CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
);

CREATE TABLE lang (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  code VARCHAR(10)
);

CREATE TABLE trans (
  id SERIAL PRIMARY KEY,
  string TEXT,
  translation TEXT,
  lang_name_id INTEGER NOT NULL,
  lang_trans_name_id INTEGER  NOT NULL,
  user_id INTEGER,
  FOREIGN KEY (lang_name_id) REFERENCES lang (id),
  FOREIGN KEY (lang_trans_name_id) REFERENCES lang (id),
  FOREIGN KEY (user_id) REFERENCES users (id)
);

INSERT INTO lang (name, code) 
VALUES ('English', 'en'),
('Chinese', 'zh'),
('French', 'fr'),
('German', 'de'),
('Italian','it'),
('Japanese','ja'),
('Korean', 'ko'),
('Russian','ru'),
('Spanish', 'es'),
('Thai', 'th'),
('Vietnamese', 'vi');

INSERT INTO users (name) 
VALUES ('Nadya'),
('Sarah'),
('Sam'),
('Quang');

INSERT INTO trans (string, translation, lang_name_id, lang_trans_name_id, user_id ) 
	VALUES ('Пока', 'Goodbye', (select id
  from lang where name = 'Russian'
  ), (select id
  from lang where name = 'English'), 
  (select id from users where users.name='Nadya'));
