--1. c1이 11이고 c2가 2인 row의 id, c3, c5 column을 조회
SELECT `id`, `c3`, `c5` FROM `crud` WHERE `c1` = 11 AND `c2` = 2;

--2. c1이 18보다 크거나 c2가 2보다 작은 row의 모든 column을 조회
SELECT * FROM `crud` WHERE `c1` > 18 OR `c2` < 2;

--3. id와 c4는 기본값, c1은 7, c2는 4, c3는 “col101”, c5는 0인 row를 생성
INSERT INTO `crud` (`c1`, `c2`, `c3`, `c5`) VALUES (7, 4, 'col101', 0);

--4. id는 103, c1은 3, c2는 3, c3는 “col103”, c4는 기본값, c5는 1인 row를 생성
INSERT INTO `crud` (`id`, `c1`, `c2`, `c3`, `c5`) VALUES (103, 3, 3, 'col103', 1);

--5. id가 100보다 큰 row의 모든 column을 조회
SELECT * FROM `crud` WHERE `id` > 100;

--6. c1이 4보다 크고 9보다 작고, c2가 1인 row의 c3를 “col0”, c5를 0으로 수정
UPDATE `crud` SET `c3` = 'col0', `c5` = 0 WHERE `c1` > 4 AND `c1` < 9 AND `c2` = 1;

--7. c1이 4보다 크고 9보다 작고, c2가 1인 row의 모든 column을 조회
SELECT * FROM `crud` WHERE `c1` > 4 AND `c1` < 9 AND `c2` = 1;

--8. c5가 0인 row를 삭제
DELETE FROM `crud` WHERE `c5` = 0;

--9. c5가 0인 row의 모든 column을 조회
SELECT * FROM `crud` WHERE `c5` = 0;
