


## db 脚本
  mysql配置，如我本地
```
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'uedtodo'
```

  库表创建
```
CREATE DATABASE uedtodo;

//notification主表，记录设备id和绑定用户名
CREATE TABLE IF NOT EXISTS `uedtodo`.`notification` (
  `register_id` INT NOT NULL,
  `register_name` VARCHAR(45) NULL,
  PRIMARY KEY (`register_id`))
ENGINE = InnoDBnotification

//msg消息表
CREATE TABLE IF NOT EXISTS `uedtodo`.`push_message` (
  `msg_id` BIGINT(30) NOT NULL,
  `msg_content` VARCHAR(45) NULL,
  PRIMARY KEY (`msg_id`))
ENGINE = InnoDB
```
