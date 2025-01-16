


node server/server_login.js




# HTML_with_JavaScript



Goto dir then pyhttp
```
FTreeMySQL/Login_site/index.html
```




login

user1::user1
user2::user2
admin::admin



MariaDB [family_tree]> select * from users;
+----+----------+--------------------------------------------------------------+
| id | username | password                                                     |
+----+----------+--------------------------------------------------------------+
|  1 | user1    | $2b$10$N2lHUPXAt7AI/ax2hWzCJeNVp9Sd/0m.iMOaHRgxxEaGgZOQOHgk. |
|  2 | user2    | $2b$10$uxIYAUkspTsYC0kFQOLrPudPd0dDuIFntwkHIJW9SAOUCpzpUbT1S |
|  3 | admin    | $2b$10$U2hMlj1MPXmNa5e9r6l8IucPKKTKr1shRvTMh2BLnoosHdYE1Utye |
+----+----------+--------------------------------------------------------------+







curl 'http://localhost:3000/login' -X POST -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:128.0) Gecko/20100101 Firefox/128.0' -H 'Accept: */*' -H 'Accept-Language: en-US,en;q=0.5' -H 'Accept-Encoding: gzip, deflate, br, zstd' -H 'Referer: http://0.0.0.0:8080/' -H 'Content-Type: application/json' -H 'Origin: http://0.0.0.0:8080' -H 'Connection: keep-alive' -H 'Sec-Fetch-Dest: empty' -H 'Sec-Fetch-Mode: cors' -H 'Sec-Fetch-Site: cross-site' -H 'Priority: u=0' --data-raw '{"username":"admin","password":"admin"}'




    Salting ensures that identical passwords result in different hashes every time.
    This randomness in the hashing process is a security feature to prevent attacks like rainbow table attacks.
    Even though the same password is provided multiple times ('admin', 'user1', 'user2'), the hash changes because of the unique salt used in each hashing operation.

Example:

    The password 'admin' will always generate the same hash, but the hash will be different each time because bcrypt generates a new salt each time it hashes the password.

To verify the password in the future, you'll need to compare the hash with the input password using bcrypt.compare().



node verifyPassword.js





