# MySQL 사용법
## CLI Program 사용법
- CLI (Command Line Interface)
- [환경변수설정](https://dog-developers.tistory.com/21)

```bash
mysql -uroot -p******
mysqlsh
```
- MySQL Shell을 오픈
```sql
-- 데이터베이스 만들기
CREATE DATABASE sample;

-- 데이터베이스 사용하기
USE sample;

-- 테이블 만들기
CREATE TABLE `users` (`idx` int(11) NOT NULL, `name` varchar(255) NOT NULL, `userid` varchar(24) NOT NULL, `userpw` varchar(255) NOT NULL, `email` varchar(255) DEFAULT NULL, PRIMARY KEY (`idx`)) DEFAULT CHARSET=utf8;

-- 만들어진 테이블 보기
SHOW TABLES;

-- 데이터 다루기
-- CRUD(Create[POST/INSERT], Read[GET/SELECT], Update[PUT/UPDATE], Delete[DELETE/DELETE])

-- 데이터 추가
INSERT INTO 테이블명 (...필드명) VALUES (...값);
INSERT INTO users SET 필드명1=값, 필드명2=값, ... ;
INSERT INTO users (`idx`, `name`, `userid`, `userpw`, `email`) VALUES (1, '홍길동', 'hong', '1234', 'hong@naver.com');
INSERT INTO users SET idx=2, name='홍길순', userid='hongks', userpw='1111', email='hongks@google.com';

-- 데이터 읽기 - 가장 복잡하다. 배울게 무궁무진하다.
SELECT * FROM 테이블명;
SELECT * FROM users;

-- 데이터 수정
UPDATE 테이블명 SET `필드명1`='값', `필드명2`='값' WHERE 조건;
UPDATE users SET `userpw`='12345', `email`='hong2@naver.com' WHERE idx=1;

-- 데이터 삭제
DELETE FROM 테이블명 WHERE 조건;
DELETE FROM users WHERE idx=1;

-- ★★★★★ DELETE와 UPDATE는 꼭!!!! WHERE절을 넣어야한다. ★★★★★
```

### MySQL 외부접속 할 수 있게 하기
```sql
-- mysql DB를 사용하겠습니다.
USE msyql;

-- root계정인데 서버 127.0.0.1에서 접근 가능한 사용자를 만들겠습니다.
CREATE user 'root'@'127.0.0.1' identified by '패스워드';

-- root계정중 127.0.0.1의 사용자에게 모든DB.모든Table의 사용을 허가합니다.
GRANT ALL PRIVILEGES ON *.* TO 'root'@'127.0.0.1';

-- 즉시 권한 적용
FLUSH PRIVILEGES;

-- 패스워드의 비밀번호 평문 -> 암호화 변경
ALTER user 'root'@'127.0.0.1' IDENTIFIED WITH mysql_native_password BY '000000';
```

```sql
CREATE TABLE `users`
	`idx` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT FIRST,
	`username` VARCHAR(50) NOT NULL,
	`userid` VARCHAR(24) NOT NULL,
	`userpw` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NULL DEFAULT NULL,
	`info` TEXT NULL,
	`createdAt` DATETIME NOT NULL DEFAULT NOW(),
	ADD PRIMARY KEY (`idx`);
```

### 새로운 계정 생성 및 데이터베이스의 권한 적용
```sql
CREATE user 'sample'@'%' IDENTIFIED BY '000000';
ALTER user 'sample'@'%' IDENTIFIED WITH mysql_native_password BY '000000';
GRANT ALL PRIVILEGES ON sample.* TO 'sample'@'%';
FLUSH PRIVILEGES;
```


## SQL문
```sql
INSERT
UPDATE: WHERE
DELETE: WHERE
SELECT: WHERE, ORDER, LIMIT

INSERT INTO 테이블명 SET 필드명=값, 필드명2=값 ...
INSERT INTO 테이블명 (필드명, 필드명2, ... ) VALUES (값, 값2, ...)
UPDATE 테이블명 SET 필드명=값, 필드명2=값 ... [필수] WHERE 
DELETE FROM 테이블명 [필수] WHERE 

SELECT 필드명1, 필드명2 FROM 테이블명;
SELECT * FROM 테이블명;
SELECT COUNT(idx) FROM 테이블명 [선택: WHERE] (ORDER는 에러남);
SELECT * FROM 테이블명 WHERE idx=1;
SELECT * FROM 테이블명 WHERE idx >= 5 AND idx <= 9;
SELECT * FROM 테이블명 WHERE title = '나비';			-- 나비
SELECT * FROM 테이블명 WHERE title LIKE '나비';		-- 나비
SELECT * FROM 테이블명 WHERE title LIKE '나비%';	-- 나비...
SELECT * FROM 테이블명 WHERE title LIKE '%나비';	-- ...나비
SELECT * FROM 테이블명 WHERE title LIKE '%나비%';	-- ...나비...
SELECT * FROM 테이블명 WHERE... ORDER BY idx DESC;
SELECT * FROM 테이블명 WHERE... ORDER BY idx ASC;
SELECT * FROM 테이블명 WHERE... ORDER BY title ASC, content DESC;
SELECT * FROM 테이블명 WHERE... ORDER... LIMIT 시작idx, 갯수;
```