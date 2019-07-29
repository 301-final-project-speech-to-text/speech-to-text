git reset --hard

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


