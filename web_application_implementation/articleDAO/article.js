const { runQuery } = require('../lib/database');

const formatDate = date => {
    const yr = date.getFullYear();
    const mon = date.getMonth() + 1;
    const dt = date.getDate();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    const secs = date.getSeconds();
    return `${yr}. ${mon}. ${dt} ${hrs}:${mins}:${secs}`;
};

const replaceDate = article => {
    if (article) {
        article.createdAt = formatDate(article.createdAt);
        article.lastUpdated = formatDate(article.lastUpdated);
    }
    return article;
};

//getList
//인자: start, count
//반환값: id, title, createdAt, lastUpdated, author의 displayName 속성을 갖는 게시물 객체의 배열
//is_active가 1, is_deleted가 0인 게시물 객체를 id의 역순으로 나열한 뒤 start번째 row부터 count개의 row 반환. 각 게시물 객체의 날짜는 문자열화되어 반환되어야 한다.
const getList = async (start, count) => {
    const sql = 'SELECT articles.id, articles.title, articles.created_at AS createdAt, ' +
                    'articles.last_updated AS lastUpdated, users.display_name AS displayName ' +
                'FROM articles INNER JOIN users ON articles.author = users.id ' +
                'WHERE articles.is_active = 1 AND articles.is_deleted = 0 ' +
                'ORDER BY articles.id DESC LIMIT ?, ?';
    const result = await runQuery(sql, [start, count]);
    return result.map(replaceDate);
}

//getTotalCount
//반환값: is_active가 1, is_deleted가 0인 게시물의 개수
const getTotalCount = async () => {
    const sql = 'SELECT COUNT(*) AS articleCount FROM articles WHERE is_active = 1 AND is_deleted = 0';
    const result = await runQuery(sql);
    return result[0].articleCount;
};

//getById
//인자: 게시물의 id
//반환값: id, title, content, createdAt, lastUpdated, author, author의 displayName 속성을 갖는 게시물 객체
//id의 값이 인자로 받은 id, is_active가 1, is_deleted가 0인 게시물 객체 반환
const getById = async (id) => {
    const sql = 'SELECT articles.id, articles.title, articles.content, articles.created_at AS createdAt, ' +
                    'articles.last_updated AS lastUpdated, articles.author, users.display_name AS displayName ' +
                'FROM articles INNER JOIN users ON articles.author = users.id ' +
                'WHERE articles.id = ? AND articles.is_active = 1 AND articles.is_deleted = 0';
    const result = await runQuery(sql, [id]);
    return replaceDate(result[0]);
};

//getByIdAndAuthor
//인자: 게시물의 id, author(사용자 객체)
//반환값: title, content, author, createdAt, lastUpdated 속성을 갖는 게시물 객체
//id가 인자로 받은 id, author이 인자로 받은 author.id, is_active가 1, is_deleted가 0인 게시물 객체 반환
const getByIdAndAuthor = async (id, author) => {
    const sql = 'SELECT title, content, author, created_at AS createdAt, last_updated AS lastUpdated ' +
                'FROM articles ' +
                'WHERE id = ? AND author = ? AND is_active = 1 AND is_deleted = 0';
    const result = await runQuery(sql, [id, author.id]);
    return replaceDate(result[0]);
};

//create
//인자: 게시물의 title, content, author(사용자 객체)
//반환값: 생성된 게시물의 데이터 ID 값
//title, content, author의 값이 각각 인자로 받은 title, content, author.id인 게시물 생성
const create = async (title, content, author) => {
    const sql = 'INSERT INTO articles (title, content, author) VALUES (?, ?, ?)';
    const result = await runQuery(sql, [title, content, author.id]);
    return result.insertId; //insertId는 자동으로 생성되는 메타데이터!
};

//update
//인자: 게시물의 id, title, content
//id가 인자로 받은 id인 게시물의 title, content 값을 인자로 받은 title, content로 수정
const update = async (id, title, content) => {
    const sql = 'UPDATE articles SET title = ?, content = ? WHERE id = ?';
    await runQuery(sql, [title, content, id]);
};

//remove
//인자: 게시물의 id
//id가 인자로 받은 id인 게시물의 is_deleted 값을 1로 수정
const remove = async (id) => {
    const sql = 'UPDATE articles SET is_deleted = 1 WHERE id = ?';
    await runQuery(sql, [id]);
};

module.exports = {
    getList,
    getTotalCount, 
    getById,
    getByIdAndAuthor,
    create, 
    update, 
    remove, 
};
