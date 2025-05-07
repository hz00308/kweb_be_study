CREATE TABLE users (
    `username` VARCHAR(20) NOT NULL UNIQUE,
    `password` VARCHAR(20) NOT NULL,
    `nickname` VARCHAR(20) NOT NULL,
    `profile_image_link` TEXT,
    `profile_status_message` VARCHAR(100),
    `deleted` TINYINT(1) DEFAULT 0,
    `join_date` DATETIME NOT NULL,
    PRIMARY KEY (`username`) 
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE channels (
    `channel_id` INT NOT NULL AUTO_INCREMENT,
    `channel_name` VARCHAR(100) NOT NULL,
    `creator` VARCHAR(20) NOT NULL,
    `channel_link` TEXT NOT NULL,
    `max_users` INT NOT NULL,
    `deleted` TINYINT(1) DEFAULT 0,
    `channel_created_date` DATETIME NOT NULL,
    PRIMARY KEY (`channel_id`),
    FOREIGN KEY (`creator`) REFERENCES `users`(`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE chats (
    `chat_id` INT NOT NULL AUTO_INCREMENT,
    `chat_content` TEXT NOT NULL,
    `chat_author` VARCHAR(20) NOT NULL,
    `chat_channel` INT NOT NULL,
    `chat_created_date` DATETIME NOT NULL,
    PRIMARY KEY (`chat_id`),
    FOREIGN KEY (`chat_author`) REFERENCES `users`(`username`) ON DELETE CASCADE,
    FOREIGN KEY (`chat_channel`) REFERENCES `channels`(`channel_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE follows (
    `follower` VARCHAR(20) NOT NULL,
    `followee` VARCHAR(20) NOT NULL,
    `follow_date` DATETIME NOT NULL,
    PRIMARY KEY (`follower`, `followee`),
    FOREIGN KEY (`follower`) REFERENCES `users`(`username`) ON DELETE CASCADE,
    FOREIGN KEY (`followee`) REFERENCES `users`(`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE blocks (
    `blocker` VARCHAR(20) NOT NULL,
    `blockee` VARCHAR(20) NOT NULL,
    `block_date` DATETIME NOT NULL,
    PRIMARY KEY (`blocker`, `blockee`),
    FOREIGN KEY (`blocker`) REFERENCES `users`(`username`) ON DELETE CASCADE,
    FOREIGN KEY (`blockee`) REFERENCES `users`(`username`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;