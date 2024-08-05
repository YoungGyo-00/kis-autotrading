package com.example.kisautotrading.global.common.service.crawler;

import com.example.kisautotrading.global.common.service.crawler.dto.TickerDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CrawlerService {
    private final WebClient webClient;
    private List<TickerDto> tickerDtoList;

    public Document getPatchHtml(String url) {
        try {
            byte[] htmlBytes = webClient.get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(byte[].class)
                    .block();
            String content = new String(htmlBytes, Charset.forName("EUC-KR"));
            return Jsoup.parse(content);
        } catch (Exception e) {
            log.error("CrawlerService getPatchHtml 에러", e);
            throw new RuntimeException("CrawlerService getPatchHtml 에러");
        }
    }

    public void saveTicker() {
        List<TickerDto> tickerDtoList = new ArrayList<>();

        for (int sosok = 0; sosok <= 1; sosok++) {
            String url = String.format("https://finance.naver.com/sise/sise_market_sum.naver?sosok=%d", sosok);
            Document doc = getPatchHtml(url);

            String lastPageLink = doc.select("td.pgRR a").attr("href");
            int endPage = Integer.parseInt(lastPageLink.substring(lastPageLink.indexOf("page=") + 5));

            for (int page = 1; page <= endPage; page++) {
                url = String.format("https://finance.naver.com/sise/sise_market_sum.naver?sosok=%d&page=%d", sosok, page);
                doc = getPatchHtml(url);

                Elements elements = doc.select("div.box_type_l table tbody tr td:nth-child(2) a");
                for (Element element : elements) {
                    String href = element.attr("href");
                    int codeIndex = href.indexOf("code=");
                    if (codeIndex != -1) {
                        String itemCode = href.substring(codeIndex + 5, codeIndex + 11);
                        String itemName = element.text();
                        tickerDtoList.add(TickerDto.of(itemCode, itemName));
                    }
                }
            }
        }

        this.tickerDtoList = tickerDtoList;
    }

    public List<TickerDto> getTicker() {
        return tickerDtoList;
    }
}
