DROP TABLE IF EXISTS lang CASCADE;
DROP TABLE IF EXISTS trans CASCADE;

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
  FOREIGN KEY (lang_name_id) REFERENCES lang (id),
  FOREIGN KEY (lang_trans_name_id) REFERENCES lang (id)
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

INSERT INTO trans (string, translation, lang_name_id, lang_trans_name_id ) 
VALUES ('Hello', 'Привет', '1', '8'),
('Привет', 'Hola', '8', '9');