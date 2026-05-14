
package com.example.lingxiao.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class QuotaStrategyDTO {
    private Long id;
    private String name;
    private Integer type;
    private Integer level;
    private Long rootId;
    private Long parentId;
    private String ipsChannel;
    private Long planId;
    private String planName;
    private Long channelId;
    private String channelName;
    private LocalDate effectiveStart;
    private LocalDate effectiveEnd;
    private Integer threshold;
    private String period;
    private Integer inBooking;
    private Integer enable;
}
