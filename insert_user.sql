DELETE FROM users WHERE email = 'admin@test.com';
INSERT INTO users (email, hashed_password, is_active)
VALUES ('admin@test.com', '$argon2id$v=19$m=65536,t=3,p=4$nvPemxMiZMwZ4xzjnNP6Pw$J/O+uctBcka2FhmjNeExTsYDdDrPw4u6Uj8y7V+e1G0', true);
