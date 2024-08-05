package com.example.kisautotrading.global.common.service.user.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuthReqeustDto {
    private String grant_type;
    private String appkey;
    private String appsecret;
}
