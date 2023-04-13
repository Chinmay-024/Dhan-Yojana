CREATE TABLE IF NOT EXISTS `users` (
    `id` CHAR(36) BINARY,
    `name` VARCHAR(255),
    `email` VARCHAR(255),
    `email_verified` DATETIME,
    `image` VARCHAR(255),
    UNIQUE `email` (`email`),
    PRIMARY KEY (`id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `accounts` (
    `id` CHAR(36) BINARY,
    `type` VARCHAR(255) NOT NULL,
    `provider` VARCHAR(255) NOT NULL,
    `provider_account_id` VARCHAR(255) NOT NULL,
    `refresh_token` VARCHAR(255),
    `access_token` VARCHAR(255),
    `expires_at` INTEGER,
    `token_type` VARCHAR(255),
    `scope` VARCHAR(255),
    `id_token` TEXT,
    `session_state` VARCHAR(255),
    `user_id` CHAR(36) BINARY,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `sessions` (
    `id` CHAR(36) BINARY,
    `expires` DATETIME NOT NULL,
    `session_token` VARCHAR(255) NOT NULL,
    `user_id` CHAR(36) BINARY,
    UNIQUE `sessionToken` (`session_token`),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `verification_tokens` (
    `token` VARCHAR(255),
    `identifier` VARCHAR(255) NOT NULL,
    `expires` DATETIME NOT NULL,
    PRIMARY KEY (`token`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS groupTable(
    groupId INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    description VARCHAR(255),
    image VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS userInvolvedGroup (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userId CHAR(36) BINARY NOT NULL,
    groupId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
    paymentId INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(50),
    type VARCHAR(50),
    totalAmount DECIMAL(10, 2),
    currency VARCHAR(50),
    groupId INT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    FOREIGN KEY (groupId) REFERENCES groupTable(groupId) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS share (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    paymentId INT UNSIGNED,
    userId CHAR(36) BINARY NOT NULL,
    amount DECIMAL(10, 2),
    owned BOOLEAN,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);