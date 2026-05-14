
CREATE TABLE IF NOT EXISTS `plan_config` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `ips_channel` varchar(50) NOT NULL COMMENT '运营商',
    `offer_id` varchar(64) NOT NULL DEFAULT '' COMMENT '移动方业务(策划)id',
    `offer_name` varchar(64) NOT NULL COMMENT '策划名称',
    `service_hand` varchar(32) NOT NULL COMMENT '办理服务',
    `type` tinyint(1) NOT NULL COMMENT '策划类型(1-联合会员、2-活动)',
    `equity_code` varchar(32) NOT NULL COMMENT '权益编码',
    `equity_name` varchar(255) NOT NULL COMMENT '权益名称',
    `extra_json` text DEFAULT NULL COMMENT '扩展信息(JSON)',
    `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用(1-启用, 0-不启用)',
    `remark` text NULL COMMENT '备注',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) DEFAULT NULL COMMENT '创建人',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) DEFAULT NULL COMMENT '更新人',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='策划管理表';

CREATE TABLE IF NOT EXISTS `plan_template_config` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `name` varchar(64) NOT NULL COMMENT '模板名称',
    `plan_id` bigint(20) NOT NULL COMMENT '策划id',
    `extra_json` text DEFAULT NULL COMMENT '扩展信息(JSON)',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) DEFAULT NULL COMMENT '创建人',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) DEFAULT NULL COMMENT '更新人',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='页面模板表';

CREATE TABLE IF NOT EXISTS `promotion_channel` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `name` varchar(80) NOT NULL COMMENT '渠道名称',
    `type` tinyint(1) NOT NULL COMMENT '渠道类型(1:出资方，2:推广方,3:出资方及推广方)',
    `status` tinyint(1) NOT NULL COMMENT '渠道状态(0:下线，1:上线)',
    `app_id` varchar(128) NULL COMMENT 'AppId',
    `public_key` text NULL COMMENT '公钥',
    `private_key` text NULL COMMENT '私钥',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) NOT NULL COMMENT '创建人id',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) NOT NULL COMMENT '更新用户id',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='渠道管理';

CREATE TABLE IF NOT EXISTS `promotion_product` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `channel_id` bigint(20) NULL COMMENT '渠道ID',
    `code` varchar(80) NOT NULL COMMENT '推广产品编码',
    `name` varchar(80) NOT NULL COMMENT '推广名称',
    `package_id` bigint(20) NOT NULL COMMENT '所属套餐ID',
    `status` tinyint(1) NOT NULL COMMENT '状态(0:下架，1:上架)',
    `promoter` varchar(64) NOT NULL COMMENT '推广方',
    `investor` varchar(64) NOT NULL COMMENT '出资方',
    `cooperation_type` tinyint(1) NOT NULL COMMENT '合作方式(1:CPA,2:CPS-合作分成,3:CPS-流水分成)',
    `cooperation_ratio` decimal(10,2) NOT NULL COMMENT '合作方式-分层比例',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) NOT NULL COMMENT '创建人id',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) NOT NULL COMMENT '更新用户id',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`),
    KEY `idx_channel_id` (`channel_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='推广管理';

CREATE TABLE IF NOT EXISTS `handle_order` (
    `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
    `phone_number` varchar(20) NOT NULL COMMENT '手机号',
    `order_id` varchar(64) NOT NULL COMMENT '订单号',
    `status` varchar(20) NOT NULL COMMENT '会员状态(0:订购中,1:已订购,2:已退订)',
    `handle_at` date NULL COMMENT '办理时间',
    `subscribe_at` date NULL COMMENT '订购时间',
    `unsubscribe_at` date NULL COMMENT '退订时间',
    `ips_channel` varchar(64) NOT NULL COMMENT '运营商',
    `ips_tx_id` varchar(64) NULL COMMENT '运营商流水号',
    `product_code` varchar(64) NOT NULL COMMENT '订购编码',
    `product_name` varchar(64) NOT NULL COMMENT '订购名称',
    `offer_id` varchar(64) NOT NULL COMMENT '策划ID',
    `offer_name` varchar(64) NOT NULL COMMENT '策划名称',
    `equity_code` varchar(32) NULL COMMENT '权益编码',
    `equity_name` varchar(64) NULL COMMENT '权益名称',
    `channel_id` bigint(20) NOT NULL COMMENT '推广渠道ID',
    `channel_name` varchar(64) NOT NULL COMMENT '推广渠道名称',
    `channel_tx_id` varchar(64) NULL COMMENT '推广渠道流水号',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) NULL COMMENT '创建人id',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) NULL COMMENT '更新用户id',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='办理订单';

CREATE TABLE IF NOT EXISTS `quota_strategy` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `name` varchar(64) DEFAULT '' COMMENT '策略名称',
    `type` tinyint(1) NOT NULL COMMENT '策略类型：1-限量，2-限办次数，3-限时',
    `level` tinyint(1) NOT NULL COMMENT '策略级别：0-运营商，1-策划，2-渠道',
    `root_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '根策略ID',
    `parent_id` bigint(20) NOT NULL DEFAULT 0 COMMENT '父级策略ID',
    `ips_channel` varchar(50) NOT NULL COMMENT '运营商',
    `plan_id` bigint(64) unsigned DEFAULT NULL COMMENT '策划ID',
    `plan_name` varchar(64) DEFAULT '' COMMENT '策划名称',
    `channel_id` bigint(20) unsigned DEFAULT NULL COMMENT '渠道ID',
    `channel_name` varchar(64) DEFAULT '' COMMENT '渠道名称',
    `effective_start` date DEFAULT NULL COMMENT '起始生效时间(包含)',
    `effective_end` date DEFAULT NULL COMMENT '结束生效时间(包含)',
    `threshold` int(4) NOT NULL DEFAULT '0' COMMENT '阈值',
    `period` varchar(20) NOT NULL DEFAULT '0' COMMENT '周期：1M、1Y等',
    `in_booking` tinyint(1) NOT NULL DEFAULT '0' COMMENT '在订',
    `enable` tinyint(1) NOT NULL DEFAULT '1' COMMENT '是否启用：1-启用, 0-不启用',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) DEFAULT NULL COMMENT '创建人',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) DEFAULT NULL COMMENT '更新人',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='办理配额策略表';

CREATE TABLE IF NOT EXISTS `blacklist_strategy` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `name` varchar(64) NOT NULL COMMENT '名称',
    `type` tinyint(1) NOT NULL COMMENT '策略类型：1-运营商，2-策划',
    `ips_channel` varchar(50) DEFAULT NULL COMMENT '运营商',
    `plan_id` bigint(64) unsigned DEFAULT NULL COMMENT '策划ID',
    `plan_name` varchar(64) DEFAULT NULL COMMENT '策划名称',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) DEFAULT NULL COMMENT '创建人',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) DEFAULT NULL COMMENT '更新人',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='黑名单策略表';

CREATE TABLE IF NOT EXISTS `blacklist_phone` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT 'ID',
    `strategy_id` bigint(20) NOT NULL COMMENT '策略ID',
    `phone_number` varchar(32) NOT NULL COMMENT '手机号',
    `effective_start` date NOT NULL COMMENT '起始生效时间(包含)',
    `effective_end` date NOT NULL COMMENT '结束生效时间(包含)',
    `is_deleted` tinyint(1) NOT NULL DEFAULT '0' COMMENT '逻辑删除：0未删除、1已删除',
    `creator_id` varchar(64) DEFAULT NULL COMMENT '创建人',
    `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `editor_id` varchar(64) DEFAULT NULL COMMENT '更新人',
    `update_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='黑名单手机号管理表';
