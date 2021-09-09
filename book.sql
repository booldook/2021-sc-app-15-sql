-- --------------------------------------------------------
-- 호스트:                          localhost
-- 서버 버전:                        8.0.26 - MySQL Community Server - GPL
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- book 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `book` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `book`;

-- 테이블 book.books 구조 내보내기
CREATE TABLE IF NOT EXISTS `books` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT COMMENT '고유번호',
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '도서제목',
  `writer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '저자',
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci COMMENT '도서 요약 설명',
  `cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL COMMENT '표지사진',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `status` enum('0','1','2','3') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT '1' COMMENT '현재상태(0:절판, 1: 판매중, 2:발행예정, 3: 삭제)',
  PRIMARY KEY (`idx`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- 테이블 데이터 book.books:~28 rows (대략적) 내보내기
DELETE FROM `books`;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` (`idx`, `title`, `writer`, `content`, `cover`, `createdAt`, `status`) VALUES
	(1, '홍길동전', '허균', '아버지를 아버지라...', NULL, '2021-09-02 16:43:27', '1'),
	(2, '구운몽전', '운몽이', '꿈에 나비를 보았네', NULL, '2021-09-02 17:19:59', '1'),
	(3, '콩쥐팥쥐전', '팥쥐', '콩쥐가 농땡이를...', NULL, '2021-09-02 17:21:06', '1'),
	(4, '허생전', '허생', '쥐의 일생', NULL, '2021-09-06 10:05:09', '1'),
	(7, '춘향전', '변사또', '춘향이랑 이몽룡', NULL, '2021-09-06 10:07:25', '1'),
	(8, '홍길동전', '허균', '홍길동이', NULL, '2021-09-06 10:14:30', '1'),
	(10, '구운몽전', '운몽이가', '나비가 꿈을 꾸었네', NULL, '2021-09-06 12:14:33', '1'),
	(14, '구운몽전', '운몽이가', '가비가 꿈을 꾸었네', NULL, '2021-09-06 12:14:33', '3'),
	(15, '봉이김선달', '선달이', '대동강 내꺼', NULL, '2021-09-07 11:51:18', '3'),
	(16, '이순신전', '이순신', '소신에겐 아직도 12척의...', NULL, '2021-09-07 11:51:48', '1'),
	(18, '홍길동전', '허균', '커버등록 테스트', NULL, '2021-09-08 09:45:19', '1'),
	(19, '홍길동전', '허균', '테스트', NULL, '2021-09-08 09:48:20', '1'),
	(20, '홍길동전', '허균', 'ㅇㅇㅇ', NULL, '2021-09-08 09:50:14', '1'),
	(21, '홍길동전', '허균', '', NULL, '2021-09-08 09:57:01', '1'),
	(22, '홍길동전', '허균', 'ㅁㅁㅁ', NULL, '2021-09-08 10:02:45', '1'),
	(23, '허생전', '허생', '허생의 이미지등록 테스트', NULL, '2021-09-08 10:08:25', '1'),
	(24, '홍길동전', '허균', '...', NULL, '2021-09-08 11:10:02', '1'),
	(25, '구운몽전', '운몽이', 'sss', NULL, '2021-09-08 11:10:21', '1'),
	(26, '압축파일', '압축이', '압축!', NULL, '2021-09-08 11:10:45', '1'),
	(27, '홍길동전', '허균', '...', NULL, '2021-09-08 12:10:11', '1'),
	(28, 'dd', 'dd', 'dd', NULL, '2021-09-08 12:10:47', '1'),
	(29, '허생전', '허균', '...', NULL, '2021-09-08 12:15:56', '1'),
	(30, 'ddd', 'ddd', 'ddd', NULL, '2021-09-08 12:17:40', '1'),
	(31, 'ddd', 'ddd', 'ddd', NULL, '2021-09-08 12:19:50', '1'),
	(32, '홍길동전', '허균', '', NULL, '2021-09-08 12:57:14', '1'),
	(33, '홍길동전', '허균', '', NULL, '2021-09-08 12:57:47', '1'),
	(34, '홍길동전', '허균', '', NULL, '2021-09-08 12:59:27', '1'),
	(35, '홍길동전', '허균', '', NULL, '2021-09-08 13:01:05', '1'),
	(36, '홍길동전', '허균', '', NULL, '2021-09-08 13:07:40', '1'),
	(37, '홍길동전', '허균', '테스트', NULL, '2021-09-08 13:07:59', '1'),
	(38, '홍길동전', '허균', '...', NULL, '2021-09-09 10:16:22', '1');
/*!40000 ALTER TABLE `books` ENABLE KEYS */;

-- 테이블 book.files 구조 내보내기
CREATE TABLE IF NOT EXISTS `files` (
  `idx` int unsigned NOT NULL AUTO_INCREMENT,
  `fidx` int unsigned NOT NULL,
  `oriname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `savename` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `mimetype` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `size` int NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fieldname` enum('C','U') NOT NULL DEFAULT 'U' COMMENT 'c: cover, u: upfile',
  `status` enum('0','1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '0:삭제, 1:사용',
  PRIMARY KEY (`idx`),
  KEY `fidx` (`fidx`),
  CONSTRAINT `FK_files_books` FOREIGN KEY (`fidx`) REFERENCES `books` (`idx`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;

-- 테이블 데이터 book.files:~9 rows (대략적) 내보내기
DELETE FROM `files`;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` (`idx`, `fidx`, `oriname`, `savename`, `mimetype`, `size`, `createdAt`, `fieldname`, `status`) VALUES
	(2, 22, '그림3.jpg', '210908_d59c0a2f-7c90-47d5-b386-9932824a89b2.jpg', 'image/jpeg', 150465, '2021-09-08 10:05:58', 'C', '1'),
	(3, 23, '그림4.JPG', '210908_102d282d-be2d-46a5-93c5-7e98a4f4adcf.jpg', 'image/jpeg', 136602, '2021-09-08 10:08:25', 'C', '1'),
	(4, 24, 'Runner - 10809.mp4', '210908_a08cfdb9-67d7-444f-954d-1088629b4f11.mp4', 'video/mp4', 768844, '2021-09-08 11:10:02', 'U', '1'),
	(5, 25, '인터넷.pptx', '210908_a0f11b62-d3dd-4fad-96af-49afe282e173.pptx', 'application/vnd.openxmlformats-officedocument.presentationml.presentation', 37040, '2021-09-08 11:10:21', 'U', '1'),
	(6, 26, 'ZoomIt.zip', '210908_df3b6f2c-3f21-4cbb-95b8-d0f4b3f31246.zip', 'application/x-zip-compressed', 458823, '2021-09-08 11:10:45', 'U', '1'),
	(7, 36, '그림2.jpg', '210908_fc9d65a8-d4f6-4e79-ae97-0c26c517ce48.jpg', 'image/jpeg', 139604, '2021-09-08 13:07:40', 'C', '1'),
	(8, 36, 'Runner - 10809.mp4', '210908_45bf0bb2-aa16-44a6-b6f8-182509554325.mp4', 'video/mp4', 768844, '2021-09-08 13:07:40', 'U', '1'),
	(9, 37, '그림1.jpg', '210908_d32ccd61-4a8f-44f5-97ee-d38fd1767923.jpg', 'image/jpeg', 104864, '2021-09-08 13:07:59', 'C', '1'),
	(10, 37, 'Runner - 10809.mp4', '210908_7f4da383-6987-41d8-aba7-e73bfa269c32.mp4', 'video/mp4', 768844, '2021-09-08 13:07:59', 'U', '1'),
	(11, 38, '그림1.jpg', '210909_36b89670-0325-440e-aaa6-9db95625f4bd.jpg', 'image/jpeg', 104864, '2021-09-09 10:16:22', 'C', '1'),
	(12, 38, 'Runner - 10809.mp4', '210909_6544de9c-a542-4f65-9cbe-9cb384f8e9ca.mp4', 'video/mp4', 768844, '2021-09-09 10:16:22', 'U', '1');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
