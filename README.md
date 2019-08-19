# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|
|mail|string|null: false, unique: true|
|password|string|null: false|

### association
- has_many :messages
- has_many :groups, through: :users_groups
- has_many :users_groups

## groupテーブル

|Column|Type|Option|
|------|----|------|
|name|string|null :false|

### association
- has_many :messages
- has_many :users, through: :users_groups
- has_many :users_groups

## users_groupsテーブル

|Column|Type|Option|
|------|----|------|
|user_id|integer|null: false, foreign_key: true|
|goup_id|integer|null: false, foreign_key: true|

### association
- belobgs_to :user
- belongs_to :group


## messagesテーブル

|Column|Type|Option|
|------|----|------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### association
- belongs_to :user
- belongs_to :group


