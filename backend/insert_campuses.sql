-- Inserir Áreas Acadêmicas
INSERT INTO academic_areas (id, name) VALUES (1, 'Ciências Exatas e da Terra') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (2, 'Ciências Biológicas') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (3, 'Engenharias') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (4, 'Ciências da Saúde') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (5, 'Ciências Agrárias') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (6, 'Ciências Sociais Aplicadas') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (7, 'Ciências Humanas') ON CONFLICT (id) DO NOTHING;
INSERT INTO academic_areas (id, name) VALUES (8, 'Linguística, Letras e Artes') ON CONFLICT (id) DO NOTHING;

-- Inserir Campuses da Região Norte (IDs 100+)
-- Acre
INSERT INTO campuses (id, name, city, state) VALUES (100, 'UFAC - Campus Rio Branco', 'Rio Branco', 'AC') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (101, 'UFAC - Campus Cruzeiro do Sul', 'Cruzeiro do Sul', 'AC') ON CONFLICT (id) DO NOTHING;

-- Amapá
INSERT INTO campuses (id, name, city, state) VALUES (102, 'UNIFAP - Campus Marco Zero', 'Macapá', 'AP') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (103, 'UNIFAP - Campus Santana', 'Santana', 'AP') ON CONFLICT (id) DO NOTHING;

-- Amazonas
INSERT INTO campuses (id, name, city, state) VALUES (104, 'UFAM - Campus Manaus', 'Manaus', 'AM') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (105, 'UEA - Campus Manaus', 'Manaus', 'AM') ON CONFLICT (id) DO NOTHING;

-- Pará
INSERT INTO campuses (id, name, city, state) VALUES (106, 'UFPA - Campus Belém', 'Belém', 'PA') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (107, 'UFRA - Campus Belém', 'Belém', 'PA') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (108, 'UNIFESSPA - Campus Marabá', 'Marabá', 'PA') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (109, 'UFOPA - Campus Santarém', 'Santarém', 'PA') ON CONFLICT (id) DO NOTHING;

-- Rondônia
INSERT INTO campuses (id, name, city, state) VALUES (110, 'UNIR - Campus Porto Velho', 'Porto Velho', 'RO') ON CONFLICT (id) DO NOTHING;

-- Roraima
INSERT INTO campuses (id, name, city, state) VALUES (111, 'UFRR - Campus Paricarana', 'Boa Vista', 'RR') ON CONFLICT (id) DO NOTHING;

-- Tocantins
INSERT INTO campuses (id, name, city, state) VALUES (112, 'UFT - Campus Palmas', 'Palmas', 'TO') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (113, 'UFT - Campus Araguaína', 'Araguaína', 'TO') ON CONFLICT (id) DO NOTHING;

-- Outros (Exemplos)
INSERT INTO campuses (id, name, city, state) VALUES (1, 'USP - Campus São Paulo', 'São Paulo', 'SP') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (2, 'UNICAMP - Campus Campinas', 'Campinas', 'SP') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (3, 'UFRJ - Campus Fundão', 'Rio de Janeiro', 'RJ') ON CONFLICT (id) DO NOTHING;
INSERT INTO campuses (id, name, city, state) VALUES (4, 'UFPE - Campus Recife', 'Recife', 'PE') ON CONFLICT (id) DO NOTHING;
