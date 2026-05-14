
package com.example.lingxiao.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class BlacklistPhoneDTO {
    private Long id;
    private Long strategyId;
    private String phoneNumber;
    private LocalDate effectiveStart;
    private LocalDate effectiveEnd;
}
