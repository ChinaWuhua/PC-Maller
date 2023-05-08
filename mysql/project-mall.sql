/*
Navicat MySQL Data Transfer

Source Server         : 本地数据库
Source Server Version : 80032
Source Host           : localhost:3306
Source Database       : project-mall

Target Server Type    : MYSQL
Target Server Version : 50699
File Encoding         : 65001

Date: 2023-05-03 13:44:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for car
-- ----------------------------
DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
`productID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品id，取自goods表的id值' ,
`ownerID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '数据所有者id，取自user表的id值' ,
`count`  int NULL DEFAULT NULL COMMENT '数量' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of car
-- ----------------------------
BEGIN;
INSERT INTO `car` VALUES ('41282e46-7ea9-49b2-b94f-5a1edf961581', 'e8281382-17e6-439e-87de-22f2715fa058', '1'), ('6bdaf042-991d-4318-948c-6a82b4f69153', 'e8281382-17e6-439e-87de-22f2715fa058', '1'), ('47be27fc-1bb7-46d6-a5c5-edf78e2430a2', 'e8281382-17e6-439e-87de-22f2715fa058', '1'), ('26184d00-ec06-4619-a4ef-560ffbab44f7', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '1'), ('47be27fc-1bb7-46d6-a5c5-edf78e2430a2', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '1'), ('5d40b294-9552-4e25-a690-b6bdd782df00', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '2');
COMMIT;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
`tradeName`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '商品名' ,
`tradePictrue`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品图片' ,
`tradePrice`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品价格' ,
`tradeCreateTime`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '商品创建日期' ,
`createorName`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '' COMMENT '创建者名字' ,
`creatorID`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '创建人' ,
`id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品id' ,
`tradeSold`  int(10) UNSIGNED ZEROFILL NULL DEFAULT NULL COMMENT '已售数量' ,
`tradeStock`  int NULL DEFAULT NULL COMMENT '库存数量' ,
`description`  varchar(1000) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品描述' ,
`statu`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`image`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图片' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of goods
-- ----------------------------
BEGIN;
INSERT INTO `goods` VALUES ('Mi Phone 13 Ultra', '2', '33', '', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '5d40b294-9552-4e25-a690-b6bdd782df00', null, '91', '描述商品信息', 'true', '59c15065-e5d9-4844-bd5d-1b219d2ae78d.jpg'), ('iPhone 14 plus', '2', '33', '', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '26184d00-ec06-4619-a4ef-560ffbab44f7', null, '88', '描述2222', 'true', ''), ('Sangsum S23 Ultra', '2', '98.1', '', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '47be27fc-1bb7-46d6-a5c5-edf78e2430a2', null, '95', 'Sangsum S23 Ultra', 'true', ''), ('OPPO Find X6 Pro', '222', '32', '', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '41282e46-7ea9-49b2-b94f-5a1edf961581', null, '89', 'OPPO Find X6 Pro', 'true', ''), ('VIVO IQOO 11 Pro', '123', '322', '', '22', '0e115d67-2a8d-4263-95ef-bde45560abfd', '6bdaf042-991d-4318-948c-6a82b4f69153', null, '983', 'VIVO IQOO 11 Pro', 'true', ''), ('banana', '1', '2', '', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '9d3b3f2a-dc17-48f8-a416-1694a2c0eb66', null, '0', 'banana', 'false', ''), ('banana', '', '3', 'Mon May 01 2023 21:39:03 GMT+0800 (GMT+08:00)', 'q', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f', 'ba7c00e7-3cb1-4940-8ab3-88c5d76f72e8', null, '2', '', 'true', ''), ('Apple', null, '2', 'Tue May 02 2023 17:34:47 GMT+0800 (GMT+08:00)', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '8cea0524-00f1-49d9-a409-132db57e940a', null, '100', 'apple ', 'false', ''), ('Orange', null, '33', 'Tue May 02 2023 17:34:47 GMT+0800 (GMT+08:00)', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'f735bb63-169d-4209-b7ef-301bcdc3427d', null, '20', 'orange', 'false', ''), ('Beans', null, '4', 'Tue May 02 2023 17:34:47 GMT+0800 (GMT+08:00)', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'a2f8e0c0-34e8-41de-b884-90db7e01e253', null, '60', 'beans', 'false', ''), ('Tomato', '', '6', 'Wed May 03 2023 13:33:52 GMT+0800 (GMT+08:00)', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '6ece1903-b34a-49ea-8a44-2205d8d9de7a', null, '18', 'Tomato', 'true', null), ('Orange', '', '20', 'Wed May 03 2023 13:35:44 GMT+0800 (GMT+08:00)', '1', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '84fefe8d-d34e-4539-8116-0dda3e160af7', '0000000020', '180', 'Orange', 'true', null);
COMMIT;

-- ----------------------------
-- Table structure for goods_wish
-- ----------------------------
DROP TABLE IF EXISTS `goods_wish`;
CREATE TABLE `goods_wish` (
`id`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品id，多个用户同时收藏会有重复' ,
`ownerID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '收藏者id' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of goods_wish
-- ----------------------------
BEGIN;
INSERT INTO `goods_wish` VALUES ('47be27fc-1bb7-46d6-a5c5-edf78e2430a2', '911b96f1-83ef-4e1c-ae1d-1714b0afc833'), ('26184d00-ec06-4619-a4ef-560ffbab44f7', '0e115d67-2a8d-4263-95ef-bde45560abfd'), ('47be27fc-1bb7-46d6-a5c5-edf78e2430a2', '0e115d67-2a8d-4263-95ef-bde45560abfd'), ('26184d00-ec06-4619-a4ef-560ffbab44f7', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('47be27fc-1bb7-46d6-a5c5-edf78e2430a2', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('41282e46-7ea9-49b2-b94f-5a1edf961581', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('6bdaf042-991d-4318-948c-6a82b4f69153', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('undefined', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('ba7c00e7-3cb1-4940-8ab3-88c5d76f72e8', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('9d3b3f2a-dc17-48f8-a416-1694a2c0eb66', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('5d40b294-9552-4e25-a690-b6bdd782df00', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0');
COMMIT;

-- ----------------------------
-- Table structure for ordergoods
-- ----------------------------
DROP TABLE IF EXISTS `ordergoods`;
CREATE TABLE `ordergoods` (
`count`  int NULL DEFAULT NULL COMMENT '购入数量' ,
`productID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品id' ,
`tradeName`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品名称' ,
`tradePrice`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '购入价格' ,
`orderID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '所属订单id' ,
`creatorID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商品创建者id' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='订单生成时将订单内全部商品进行保存，防止商品属性（价格等）发生变化'

;

-- ----------------------------
-- Records of ordergoods
-- ----------------------------
BEGIN;
INSERT INTO `ordergoods` VALUES ('3', '5d40b294-9552-4e25-a690-b6bdd782df00', 'Mi Phone 13 Ultra', '33', 'b32ab6aa-59a2-4222-85a9-746d1eef534c', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '41282e46-7ea9-49b2-b94f-5a1edf961581', 'OPPO Find X6 Pro', '32', 'b32ab6aa-59a2-4222-85a9-746d1eef534c', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('2', '6bdaf042-991d-4318-948c-6a82b4f69153', 'VIVO IQOO 11 Pro', '322', 'b32ab6aa-59a2-4222-85a9-746d1eef534c', '0e115d67-2a8d-4263-95ef-bde45560abfd'), ('2', 'ba7c00e7-3cb1-4940-8ab3-88c5d76f72e8', 'banana', '3', 'b32ab6aa-59a2-4222-85a9-746d1eef534c', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f'), ('4', '5d40b294-9552-4e25-a690-b6bdd782df00', 'Mi Phone 13 Ultra', '33', '6b071dce-7cca-4bd8-a041-d94a6b573943', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '26184d00-ec06-4619-a4ef-560ffbab44f7', 'iPhone 14 plus', '33', '6b071dce-7cca-4bd8-a041-d94a6b573943', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '47be27fc-1bb7-46d6-a5c5-edf78e2430a2', 'Sangsum S23 Ultra', '98.1', '6b071dce-7cca-4bd8-a041-d94a6b573943', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '41282e46-7ea9-49b2-b94f-5a1edf961581', 'OPPO Find X6 Pro', '32', '6b071dce-7cca-4bd8-a041-d94a6b573943', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('3', '6bdaf042-991d-4318-948c-6a82b4f69153', 'VIVO IQOO 11 Pro', '322', '6b071dce-7cca-4bd8-a041-d94a6b573943', '0e115d67-2a8d-4263-95ef-bde45560abfd'), ('3', '26184d00-ec06-4619-a4ef-560ffbab44f7', 'iPhone 14 plus', '33', '6da57004-4f64-45e1-9261-699adb01990c', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '47be27fc-1bb7-46d6-a5c5-edf78e2430a2', 'Sangsum S23 Ultra', '98.1', '600ebdb1-9464-4a90-ac8f-fcee356cb75e', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '5d40b294-9552-4e25-a690-b6bdd782df00', 'Mi Phone 13 Ultra', '33', '986c2879-d6ea-4add-b2d3-976e203c81d8', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', 'ba7c00e7-3cb1-4940-8ab3-88c5d76f72e8', 'banana', '3', '6bea05ca-0eee-47f9-9a5f-a5be853d55d3', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f'), ('1', '41282e46-7ea9-49b2-b94f-5a1edf961581', 'OPPO Find X6 Pro', '32', 'e2971bc1-e9a8-45fd-af42-3850714182b8', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('1', '6bdaf042-991d-4318-948c-6a82b4f69153', 'VIVO IQOO 11 Pro', '322', '310b59f5-8d03-4951-b209-98696df903d7', '0e115d67-2a8d-4263-95ef-bde45560abfd'), ('1', '26184d00-ec06-4619-a4ef-560ffbab44f7', 'iPhone 14 plus', '33', '8debb6e2-d0e2-4395-81e7-dc9de14c85ae', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('2', '6ece1903-b34a-49ea-8a44-2205d8d9de7a', 'Tomato', '6', 'f7490be4-cac6-42c5-9294-12c769fc498d', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('2', '84fefe8d-d34e-4539-8116-0dda3e160af7', 'Orange', '20', '36bc6d11-9cbc-4fa4-a60e-2a269dd84dd6', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('3', '84fefe8d-d34e-4539-8116-0dda3e160af7', 'Orange', '20', '197ec067-35af-47c7-99f7-6f135214ec15', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0'), ('20', '84fefe8d-d34e-4539-8116-0dda3e160af7', 'Orange', '20', '8dbbb1f8-167c-4f1d-93ce-9626c8e5b44e', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0');
COMMIT;

-- ----------------------------
-- Table structure for orderlist
-- ----------------------------
DROP TABLE IF EXISTS `orderlist`;
CREATE TABLE `orderlist` (
`orderID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单id' ,
`createTime`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '生成时间' ,
`farmerID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '商家id' ,
`customerID`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单所有者id' ,
`orderStatu`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单状态：进行中、已完成' ,
`amount`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单总金额' ,
`customerName`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '顾客姓名' ,
`products`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '订单商品概览' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of orderlist
-- ----------------------------
BEGIN;
INSERT INTO `orderlist` VALUES ('b32ab6aa-59a2-4222-85a9-746d1eef534c', 'Tue May 02 2023 12:58:29 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '131', '1', 'Mi Phone 13 Ultra*3, OPPO Find X6 Pro*1'), ('b32ab6aa-59a2-4222-85a9-746d1eef534c', 'Tue May 02 2023 12:58:29 GMT+0800 (GMT+08:00)', '0e115d67-2a8d-4263-95ef-bde45560abfd', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '644', '1', 'VIVO IQOO 11 Pro*2'), ('b32ab6aa-59a2-4222-85a9-746d1eef534c', 'Tue May 02 2023 12:58:29 GMT+0800 (GMT+08:00)', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '6', '1', 'banana*2'), ('6b071dce-7cca-4bd8-a041-d94a6b573943', 'Tue May 02 2023 13:33:52 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '295.1', '1', 'Mi Phone 13 Ultra*4, iPhone 14 plus*1, Sangsum S23 Ultra*1, OPPO Find X6 Pro*1'), ('6b071dce-7cca-4bd8-a041-d94a6b573943', 'Tue May 02 2023 13:33:52 GMT+0800 (GMT+08:00)', '0e115d67-2a8d-4263-95ef-bde45560abfd', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '966', '1', 'VIVO IQOO 11 Pro*3'), ('6da57004-4f64-45e1-9261-699adb01990c', 'Tue May 02 2023 13:35:05 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '99', '1', 'iPhone 14 plus*3'), ('600ebdb1-9464-4a90-ac8f-fcee356cb75e', 'Tue May 02 2023 14:07:58 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '98.1', '1', 'Sangsum S23 Ultra*1'), ('986c2879-d6ea-4add-b2d3-976e203c81d8', 'Tue May 02 2023 14:08:02 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '33', '1', 'Mi Phone 13 Ultra*1'), ('6bea05ca-0eee-47f9-9a5f-a5be853d55d3', 'Tue May 02 2023 14:08:11 GMT+0800 (GMT+08:00)', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '3', '1', 'banana*1'), ('e2971bc1-e9a8-45fd-af42-3850714182b8', 'Tue May 02 2023 14:08:27 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '32', '1', 'OPPO Find X6 Pro*1'), ('310b59f5-8d03-4951-b209-98696df903d7', 'Tue May 02 2023 14:08:31 GMT+0800 (GMT+08:00)', '0e115d67-2a8d-4263-95ef-bde45560abfd', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '322', '1', 'VIVO IQOO 11 Pro*1'), ('8debb6e2-d0e2-4395-81e7-dc9de14c85ae', 'Tue May 02 2023 14:08:36 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', 'ordered', '33', '1', 'iPhone 14 plus*1'), ('f7490be4-cac6-42c5-9294-12c769fc498d', 'Wed May 03 2023 13:34:34 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '0e115d67-2a8d-4263-95ef-bde45560abfd', 'ordered', '12', '22', 'Tomato*2'), ('36bc6d11-9cbc-4fa4-a60e-2a269dd84dd6', 'Wed May 03 2023 13:36:03 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '0e115d67-2a8d-4263-95ef-bde45560abfd', 'ordered', '40', '22', 'Orange*2'), ('197ec067-35af-47c7-99f7-6f135214ec15', 'Wed May 03 2023 13:38:18 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '0e115d67-2a8d-4263-95ef-bde45560abfd', 'ordered', '60', '22', 'Orange*3'), ('8dbbb1f8-167c-4f1d-93ce-9626c8e5b44e', 'Wed May 03 2023 13:38:58 GMT+0800 (GMT+08:00)', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '0e115d67-2a8d-4263-95ef-bde45560abfd', 'ordered', '400', '22', 'Orange*20');
COMMIT;

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles` (
`label`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`value`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`routes`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '具备访问权的路由' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of roles
-- ----------------------------
BEGIN;
INSERT INTO `roles` VALUES ('普通用户', '普通用户', '/home/personal,/shopcar,/orderlist,/tradedetail'), ('商家', '商家', '/home,/personal,/shopcar,/tradelist,/trademodify'), ('管理员', 'admin', '/home,/personal,/shopcar,/summary');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
`username`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '账户名' ,
`password`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '密码' ,
`registDate`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册日期' ,
`lastLoginDate`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '上次登录时间' ,
`role`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '角色' ,
`loginErrorTimes`  int NULL DEFAULT NULL COMMENT '登录错误次数' ,
`id`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`email`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '邮箱' 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('1', '1', 'Sat Apr 29 2023 20:39:11 GMT+0800 (GMT+08:00)', '', 'Farmer', '0', '911b96f1-83ef-4e1c-ae1d-1714b0afc8c0', '1'), ('22', '22', 'Sun Apr 30 2023 17:31:02 GMT+0800 (GMT+08:00)', '', 'Customer', '0', '0e115d67-2a8d-4263-95ef-bde45560abfd', '22'), ('q', 'q', 'Sun Apr 30 2023 22:00:45 GMT+0800 (GMT+08:00)', '', 'Customer', '0', 'c02cc6e6-8abc-4595-bd77-9114cb9c943f', 'q'), ('admin', 'admin', 'Tue May 02 2023 14:45:00 GMT+0800 (GMT+08:00)', '', 'admin', '0', 'e8281382-17e6-439e-87de-22f2715fa058', 'admin'), ('custome', 'custome', 'Wed May 03 2023 13:42:20 GMT+0800 (GMT+08:00)', '', 'Customer', '0', 'e0f10057-d250-4abc-b6b2-28533de4c2fa', 'custome'), ('farmer', 'farmer', 'Wed May 03 2023 13:42:28 GMT+0800 (GMT+08:00)', '', 'Farmer', '0', 'e5e69eed-5530-4c13-b33e-32fa44bd71bc', 'farmer');
COMMIT;
