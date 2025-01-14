# FTreeMySQL



** Web page**
https://github.com/Tpj-root/FFTree



**Mysql**



SQL Database and Tables


```
CREATE DATABASE family_tree;
```

```
DROP DATABASE family_tree;
```




USE family_tree;

```
CREATE TABLE people (
    id INT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    birthday DATE,
    avatar VARCHAR(255),
    gender CHAR(1)
);

```

```
CREATE TABLE relationships (
    person_id INT,
    relation_type VARCHAR(255),
    related_person_id INT,
    PRIMARY KEY (person_id, relation_type, related_person_id),
    FOREIGN KEY (person_id) REFERENCES people(id),
    FOREIGN KEY (related_person_id) REFERENCES people(id)
);


```



Insert Data Into Tables



```
INSERT INTO people (id, first_name, last_name, birthday, avatar, gender) VALUES
(0, 'SAB', '', NULL, '', 'M'),
(2, 'SHANTHI', '', NULL, '', 'F'),
(1, 'BASKARAN', '', NULL, '', 'M');
```


```
INSERT INTO relationships (person_id, relation_type, related_person_id) VALUES
(0, 'mother', 2),
(0, 'father', 1),
(2, 'children', 0),
(2, 'spouses', 1),
(1, 'children', 0),
(1, 'spouses', 2);
```








# backup

mysqldump -u root -p family_tree > backup_family_tree.sql




# RUN

npm install


# Api

node server.js


# url



http://localhost:3000/api/relationships?key=iamsab


```

[{"person_id":0,"relation_type":"father","related_person_id":1},{"person_id":0,"relation_type":"mother","related_person_id":2},{"person_id":1,"relation_type":"children","related_person_id":0},{"person_id":1,"relation_type":"spouses","related_person_id":2},{"person_id":2,"relation_type":"children","related_person_id":0},{"person_id":2,"relation_type":"spouses","related_person_id":1}]
```

```
MariaDB [family_tree]> select * from relationships;
+-----------+---------------+-------------------+
| person_id | relation_type | related_person_id |
+-----------+---------------+-------------------+
|         0 | father        |                 1 |
|         0 | mother        |                 2 |
|         1 | children      |                 0 |
|         1 | spouses       |                 2 |
|         2 | children      |                 0 |
|         2 | spouses       |                 1 |
+-----------+---------------+-------------------+
6 rows in set (0.001 sec)
```






http://localhost:3000/api/people?key=iamsab

```
[{"id":0,"first_name":"SAB","last_name":"","birthday":null,"avatar":"","gender":"M"},{"id":1,"first_name":"BASKARAN","last_name":"","birthday":null,"avatar":"","gender":"M"},{"id":2,"first_name":"SHANTHI","last_name":"","birthday":null,"avatar":"","gender":"F"}]

```


```
MariaDB [family_tree]> select * from people;
+----+------------+-----------+----------+--------+--------+
| id | first_name | last_name | birthday | avatar | gender |
+----+------------+-----------+----------+--------+--------+
|  0 | SAB        |           | NULL     |        | M      |
|  1 | BASKARAN   |           | NULL     |        | M      |
|  2 | SHANTHI    |           | NULL     |        | F      |
+----+------------+-----------+----------+--------+--------+
3 rows in set (0.001 sec)
```













