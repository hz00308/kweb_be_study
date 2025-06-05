const { runQuery } = require('../lib/database');

//getByUsername
//인자: 사용자의 username
//반환값: id, password, displayName, isActive, isStaff 속성을 갖는 사용자 객체
//username의 값이 인자로 받은 username인 사용자 객체 반환
const getByUsername = async username => {
    const sql = 'SELECT id, password, display_name AS displayName, is_active AS isActive, is_staff AS isStaff FROM users WHERE username = ?';
    const result = await runQuery(sql, [username]);
    return result[0];
};

//create
//인자: 사용자의 username, password(암호화된 형태), displayName
//username, password, display_name의 값이 각각 인자로 받은 username, password, displayName인 사용자 생성
const create = async (username, password, displayName) => {
    const sql = 'INSERT INTO users (username, password, display_name) VALUES (?, ?, ?)';
    await runQuery(sql, [username, password, displayName]);
};

module.exports = {
    getByUsername,
    create,
};

