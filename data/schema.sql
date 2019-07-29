DROP TABLE IF EXISTS lang ;
DROP TABLE IF EXISTS trans ;

CREATE TABLE lang (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255)
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


INSERT INTO lang (name) 
VALUES ('English'),
('Chinese'),
('French'),
('German'),
('Italian'),
('Japanese'),
('Korean'),
('Russian'),
('Spanish'),
('Thai'),
('Vietnamese');

INSERT INTO trans (string, translation, lang_name_id, lang_trans_name_id ) 
VALUES ('Hello', 'Привет', '1', '8'),
('Привет', 'Hola', '8', '9')
