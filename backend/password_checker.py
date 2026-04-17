import bcrypt

# 从数据库中获取的加密密码
encoded_password = b'$2a$10$shE2geCPkGP0SMx2yiY8C.HTTOOEm7j1RB8zj4AmPk5eD71B88YPe'
# 要验证的原始密码
raw_password = b'202401'

# 验证密码
matches = bcrypt.checkpw(raw_password, encoded_password)
print(f"Password matches: {matches}")